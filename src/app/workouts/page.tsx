'use client'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { useState, useEffect } from 'react';
import { generateWorkoutPlan } from '../../lib/ai';
import Link from 'next/link';
import { FaDumbbell, FaRunning, FaHeart, FaFire, FaClock, FaLightbulb, FaLeaf, FaHome } from 'react-icons/fa';

type Profile = {
  name?: string;
  sex?: string;
  age?: string | number;
  weight?: string | number;
  height?: string | number;
  issues?: string;
  motive?: string;
  goal?: string;
  diet?: string;
};

type SavedWorkoutPlan = {
  generatedAt: string;
  plan: string;
  // add other fields if needed
};

export default function WorkoutsPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <WorkoutPlanSection />
      </SignedIn>
    </>
  )
}

function WorkoutPlanSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedPlan, setSavedPlan] = useState<SavedWorkoutPlan | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingSaved, setLoadingSaved] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load profile
        const profileRes = await fetch('/api/profile');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
        
        // Load saved workout plan
        const workoutRes = await fetch('/api/workouts');
        if (workoutRes.ok) {
          const workoutData = await workoutRes.json();
          console.log('Loaded saved workout plan:', workoutData);
          if (workoutData && workoutData.plan) {
            setSavedPlan(workoutData);
            setGeneratedPlan(workoutData.plan);
          }
        } else {
          console.log('No saved workout plan found or error loading');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoadingSaved(false);
      }
    };

    loadData();
  }, []);

  async function handleGenerate() {
    if (!profile) return;
    setLoading(true);
    setGeneratedPlan('');
    setError('');
    try {
      // Compose a user info string for the AI
      const userInfo = `Name: ${profile.name || ''}, Sex: ${profile.sex || ''}, Age: ${profile.age || ''}, Weight: ${profile.weight || ''}kg, Height: ${profile.height || ''}cm, Issues: ${profile.issues || ''}, Motive: ${profile.motive || ''}, Goal: ${profile.goal || ''}, Diet: ${profile.diet || ''}`;
      const result = await generateWorkoutPlan(userInfo);
      setGeneratedPlan(result);
      
      // Save the generated plan
      const saveResponse = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: result,
          generatedAt: new Date().toISOString()
        })
      });
      
      if (saveResponse.ok) {
        const savedData = await saveResponse.json();
        setSavedPlan(savedData);
        console.log('Workout plan saved successfully:', savedData);
      } else {
        console.error('Failed to save workout plan');
      }
    } catch (error) {
      console.error('Error generating workout plan:', error);
      setError('Sorry, there was an error generating your workout plan.');
    } finally {
      setLoading(false);
    }
  }

  const morningWorkout = {
    title: 'Morning Workout',
    icon: FaRunning,
    color: 'from-orange-400 to-yellow-400',
    duration: '45 minutes',
    time: '6:00 AM - 6:45 AM',
    sections: [
      {
        title: 'Warm-up (5 min)',
        exercises: [
          'Light jogging in place - 2 minutes',
          'Arm circles and shoulder rolls - 1 minute',
          'Hip rotations and leg swings - 1 minute',
          'Jumping jacks - 1 minute'
        ]
      },
      {
        title: 'Cardio (20 min)',
        exercises: [
          'High-intensity interval training (HIIT)',
          '30 seconds sprint, 30 seconds walk - 10 rounds',
          'Mountain climbers - 3 sets of 30 seconds',
          'Burpees - 3 sets of 10 reps'
        ]
      },
      {
        title: 'Strength (15 min)',
        exercises: [
          'Push-ups - 3 sets of 15 reps',
          'Squats - 3 sets of 20 reps',
          'Plank holds - 3 sets of 30 seconds',
          'Lunges - 3 sets of 10 reps each leg'
        ]
      },
      {
        title: 'Cool-down (5 min)',
        exercises: [
          'Static stretching - 3 minutes',
          'Deep breathing exercises - 2 minutes'
        ]
      }
    ]
  };

  const eveningWorkout = {
    title: 'Evening Workout',
    icon: FaDumbbell,
    color: 'from-purple-400 to-indigo-400',
    duration: '45 minutes',
    time: '6:00 PM - 6:45 PM',
    sections: [
      {
        title: 'Warm-up (5 min)',
        exercises: [
          'Dynamic stretching - 3 minutes',
          'Light walking or cycling - 2 minutes'
        ]
      },
      {
        title: 'Strength Training (25 min)',
        exercises: [
          'Deadlifts - 4 sets of 8-10 reps',
          'Bench press - 4 sets of 8-10 reps',
          'Pull-ups or assisted pull-ups - 3 sets of 5-8 reps',
          'Overhead press - 3 sets of 8-10 reps',
          'Bent-over rows - 3 sets of 10-12 reps'
        ]
      },
      {
        title: 'Core Work (10 min)',
        exercises: [
          'Crunches - 3 sets of 20 reps',
          'Russian twists - 3 sets of 30 seconds',
          'Leg raises - 3 sets of 15 reps',
          'Side planks - 2 sets of 30 seconds each side'
        ]
      },
      {
        title: 'Cool-down (5 min)',
        exercises: [
          'Foam rolling - 3 minutes',
          'Static stretching - 2 minutes'
        ]
      }
    ]
  };

  if (!profile || !profile.name) {
    return (
      <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl shadow-lg animate-fade-in">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">Workout Plan</h1>
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 text-center">
          <div className="text-lg text-slate-700 mb-4">To view your personalized workout plans, please update your profile first.</div>
          <Link href="/profile" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">Go to Profile</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-lg">Workout Plan</h1>
        <Link href="/dashboard" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <FaHome className="text-lg" />
          Dashboard
        </Link>
      </div>
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
        {loadingSaved ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your workout plan...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-slate-700 text-lg">
              {savedPlan ? (
                <div className="flex items-center justify-between">
                  <span>Your saved workout plan (generated on {new Date(savedPlan.generatedAt).toLocaleDateString()})</span>
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? <span className="animate-pulse">Generating...</span> : 'Regenerate Plan'}
                  </button>
                </div>
              ) : (
                <span>Your personalized 45-minute workout plans for morning and evening, designed to maximize your fitness results.</span>
              )}
            </div>
            
            {!savedPlan && (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed mb-6"
              >
                {loading ? <span className="animate-pulse">Generating...</span> : 'Generate AI Workout Plan'}
              </button>
            )}
            
            {error && <div className="text-red-600 font-semibold mb-4 animate-fade-in">{error}</div>}
            
            {generatedPlan && (
              <div className="mb-8 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
                    <FaDumbbell className="text-white text-xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-indigo-700">Your AI-Generated Workout Plan</h2>
                </div>
                
                {/* <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 p-6">
                  <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed font-sans">
                    {generatedPlan}
                  </pre>
                </div> */}
              </div>
            )}
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Morning Workout */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${morningWorkout.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <morningWorkout.icon className="text-3xl" />
                      <h3 className="text-2xl font-bold">{morningWorkout.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <FaClock />
                        <span>{morningWorkout.duration}</span>
                      </div>
                      <div className="text-xs opacity-90">{morningWorkout.time}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {morningWorkout.sections.map((section, index) => (
                      <div key={index} className="border-l-4 border-orange-400 pl-4">
                        <h4 className="font-semibold text-slate-800 mb-2">{section.title}</h4>
                        <ul className="space-y-1">
                          {section.exercises.map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex} className="text-sm text-slate-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{exercise}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Evening Workout */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${eveningWorkout.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <eveningWorkout.icon className="text-3xl" />
                      <h3 className="text-2xl font-bold">{eveningWorkout.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <FaClock />
                        <span>{eveningWorkout.duration}</span>
                      </div>
                      <div className="text-xs opacity-90">{eveningWorkout.time}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {eveningWorkout.sections.map((section, index) => (
                      <div key={index} className="border-l-4 border-purple-400 pl-4">
                        <h4 className="font-semibold text-slate-800 mb-2">{section.title}</h4>
                        <ul className="space-y-1">
                          {section.exercises.map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex} className="text-sm text-slate-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{exercise}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
                  <FaLightbulb className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-700 mb-2">Workout Tips</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <FaHeart className="text-red-500" />
                      <span>Always warm up before starting your workout</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaFire className="text-orange-500" />
                      <span>Stay hydrated throughout your workout session</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaClock className="text-indigo-500" />
                      <span>Allow 48 hours rest between strength training sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaLeaf className="text-green-500" />
                      <span>Listen to your body and don't push through pain</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 