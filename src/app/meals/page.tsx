'use client'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { useState, useEffect } from 'react';
import { generateMealPlan } from '../../lib/ai';
import Link from 'next/link';
import { FaUtensils, FaCoffee, FaAppleAlt, FaDrumstickBite, FaLeaf, FaCalculator, FaLightbulb, FaHome } from 'react-icons/fa';

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

export default function MealsPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <MealPlanSection />
      </SignedIn>
    </>
  )
}

function MealPlanSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedPlan, setSavedPlan] = useState<any>(null);
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
        
        // Load saved meal plan
        const mealRes = await fetch('/api/meals');
        if (mealRes.ok) {
          const mealData = await mealRes.json();
          console.log('Loaded saved meal plan:', mealData);
          if (mealData && mealData.plan) {
            setSavedPlan(mealData);
            setPlan(mealData.plan);
          }
        } else {
          console.log('No saved meal plan found or error loading');
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
    setPlan('');
    setError('');
    try {
      // Compose a user info string for the AI
      const userInfo = `Name: ${profile.name || ''}, Sex: ${profile.sex || ''}, Age: ${profile.age || ''}, Weight: ${profile.weight || ''}kg, Height: ${profile.height || ''}cm, Issues: ${profile.issues || ''}, Motive: ${profile.motive || ''}, Goal: ${profile.goal || ''}, Diet: ${profile.diet || ''}`;
      const result = await generateMealPlan(userInfo);
      setPlan(result);
      
      // Save the generated plan
      const saveResponse = await fetch('/api/meals', {
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
        console.log('Meal plan saved successfully:', savedData);
      } else {
        console.error('Failed to save meal plan');
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError('Sorry, there was an error generating your meal plan.');
    } finally {
      setLoading(false);
    }
  }

  // Helper function to parse and structure meal plan
  function parseMealPlan(planText: string) {
    const meals = [];
    const lines = planText.split('\n').filter(line => line.trim());
    
    let currentMeal = null;
    let currentItems = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.toLowerCase().includes('breakfast')) {
        if (currentMeal) meals.push({ ...currentMeal, items: currentItems });
        currentMeal = { title: 'Breakfast', icon: FaCoffee, color: 'from-orange-400 to-yellow-400' };
        currentItems = [];
      } else if (trimmedLine.toLowerCase().includes('lunch')) {
        if (currentMeal) meals.push({ ...currentMeal, items: currentItems });
        currentMeal = { title: 'Lunch', icon: FaUtensils, color: 'from-green-400 to-emerald-400' };
        currentItems = [];
      } else if (trimmedLine.toLowerCase().includes('dinner')) {
        if (currentMeal) meals.push({ ...currentMeal, items: currentItems });
        currentMeal = { title: 'Dinner', icon: FaDrumstickBite, color: 'from-purple-400 to-pink-400' };
        currentItems = [];
      } else if (trimmedLine.toLowerCase().includes('snack')) {
        if (currentMeal) meals.push({ ...currentMeal, items: currentItems });
        currentMeal = { title: 'Snacks', icon: FaAppleAlt, color: 'from-blue-400 to-cyan-400' };
        currentItems = [];
      } else if (trimmedLine && currentMeal && (trimmedLine.startsWith('-') || trimmedLine.startsWith('•') || trimmedLine.startsWith('*'))) {
        currentItems.push(trimmedLine.replace(/^[-•*]\s*/, ''));
      } else if (trimmedLine && currentMeal && !trimmedLine.toLowerCase().includes('nutrition') && !trimmedLine.toLowerCase().includes('calories')) {
        currentItems.push(trimmedLine);
      }
    }
    
    if (currentMeal) meals.push({ ...currentMeal, items: currentItems });
    
    return meals;
  }

  if (!profile || !profile.name) {
    return (
      <section className="container mx-auto px-4 py-12 bg-violet-50 rounded-2xl shadow animate-fade-in">
        <h1 className="text-4xl font-bold text-emerald-700 mb-6">Meal Plan</h1>
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 text-center">
          <div className="text-lg text-slate-700 mb-4">To generate a personalized meal plan, please update your profile first.</div>
          <Link href="/profile" className="inline-block bg-gradient-to-r from-emerald-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">Go to Profile</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-violet-100 via-slate-100 to-emerald-100 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-emerald-700 drop-shadow-lg">Meal Plan</h1>
        <Link href="/dashboard" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <FaHome className="text-lg" />
          Dashboard
        </Link>
      </div>
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
        {loadingSaved ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your meal plan...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-slate-700 text-lg">
              {savedPlan ? (
                <div className="flex items-center justify-between">
                  <span>Your saved meal plan (generated on {new Date(savedPlan.generatedAt).toLocaleDateString()})</span>
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? <span className="animate-pulse">Generating...</span> : 'Regenerate Plan'}
                  </button>
                </div>
              ) : (
                <span>Your meal plan is generated based on your profile. Click below to get a new plan with guidance for each meal.</span>
              )}
            </div>
            {!savedPlan && (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-gradient-to-r from-emerald-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <span className="animate-pulse">Generating...</span> : 'Generate Meal Plan'}
              </button>
            )}
            <div className="mt-8 min-h-[160px]">
              {error && <div className="text-red-600 font-semibold mb-4 animate-fade-in">{error}</div>}
              {plan && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-purple-500 p-3 rounded-full">
                      <FaUtensils className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-700">Your Personalized Meal Plan</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {parseMealPlan(plan).map((meal, index) => (
                      <div key={index} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className={`bg-gradient-to-r ${meal.color} p-4 text-white`}>
                          <div className="flex items-center gap-3">
                            <meal.icon className="text-2xl" />
                            <h3 className="text-xl font-bold">{meal.title}</h3>
                          </div>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-3">
                            {meal.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-slate-700 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
                        <FaLightbulb className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-indigo-700 mb-2">Smart Tips</h3>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-center gap-2">
                            <FaCalculator className="text-emerald-500" />
                            <span>Adjust portions based on your activity level and goals</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FaLeaf className="text-emerald-500" />
                            <span>Stay hydrated with 8-10 glasses of water daily</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <FaUtensils className="text-emerald-500" />
                            <span>Eat slowly and mindfully for better digestion</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!plan && !loading && !savedPlan && (
                <div className="text-center mt-8">
                  <div className="bg-white/50 backdrop-blur-md rounded-xl p-8 border border-gray-200">
                    <FaUtensils className="text-4xl text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">Your AI-generated meal plan will appear here</p>
                    <p className="text-slate-400 text-sm mt-2">Click "Generate Meal Plan" to get started</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
} 