'use client';

import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaUser, 
  FaDumbbell, 
  FaUtensils, 
  FaChartLine, 
  FaTrophy, 
  FaFire, 
  FaHeart, 
  FaBullseye,
  FaCalendarAlt,
  FaClock,
  FaLeaf,
  FaWeight,
  FaRulerVertical,
  FaLightbulb,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle
} from 'react-icons/fa';
import Image from 'next/image';

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
  imageUrl?: string;
};

type DashboardStats = {
  workoutStreak: number;
  mealAdherence: number;
  caloriesBurned: number;
  weightProgress: number;
  weeklyWorkouts: number;
  weeklyMeals: number;
};

export default function DashboardPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
          <DashboardContent />
      </SignedIn>
    </>
  )
}

function DashboardContent() {
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.ok ? res.json() : null)
      .then(data => setProfile(data))
      .catch(() => setProfile(null));
    fetch('/api/profile?dashboard=1')
      .then(res => res.ok ? res.json() : null)
      .then(data => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  const weeklyData = [
    { day: 'Mon', workouts: 1, meals: 3, calories: 350 },
    { day: 'Tue', workouts: 1, meals: 3, calories: 420 },
    { day: 'Wed', workouts: 0, meals: 2, calories: 280 },
    { day: 'Thu', workouts: 1, meals: 3, calories: 380 },
    { day: 'Fri', workouts: 1, meals: 3, calories: 400 },
    { day: 'Sat', workouts: 1, meals: 2, calories: 320 },
    { day: 'Sun', workouts: 0, meals: 2, calories: 300 }
  ];

  const todayMeals = [
    { name: 'Breakfast', time: '7:00 AM', status: 'completed', calories: 450 },
    { name: 'Lunch', time: '12:30 PM', status: 'completed', calories: 650 },
    { name: 'Dinner', time: '7:00 PM', status: 'pending', calories: 550 }
  ];

  const todayWorkouts = [
    { name: 'Morning Cardio', time: '6:00 AM', status: 'completed', duration: '45 min' },
    { name: 'Evening Strength', time: '6:00 PM', status: 'pending', duration: '45 min' }
  ];

  const getBMI = () => {
    if (!profile?.weight || !profile?.height) return null;
    const weight = parseFloat(profile.weight.toString());
    const height = parseFloat(profile.height.toString()) / 100;
    return (weight / (height * height)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { category: 'Obese', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const bmi = getBMI();
  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-violet-100 via-indigo-100 to-purple-100 rounded-2xl shadow-lg animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            {profile?.imageUrl ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg">
                <Image 
                  src={profile.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  width={64}
                  height={64}
                />
              </div>
            ) : (
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-full">
                <FaUser className="text-white text-2xl" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-indigo-700">Welcome back, {user?.firstName || profile?.name || 'User'}!</h1>
            <p className="text-lg text-slate-600">Here's your personalized fitness dashboard</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaFire className="text-2xl text-orange-500" />
            <div className="flex items-center gap-1 text-sm text-green-500">
              <FaArrowUp />
              <span>+12%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{loading || !stats ? '--' : stats.workoutStreak}</h3>
          <p className="text-slate-600">Day Streak</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaUtensils className="text-2xl text-emerald-500" />
            <div className="flex items-center gap-1 text-sm text-green-500">
              <FaArrowUp />
              <span>+5%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{loading || !stats ? '--' : stats.mealAdherence}%</h3>
          <p className="text-slate-600">Meal Adherence</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-2xl text-purple-500" />
            <div className="flex items-center gap-1 text-sm text-green-500">
              <FaArrowUp />
              <span>+8%</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{loading || !stats ? '--' : stats.caloriesBurned}</h3>
          <p className="text-slate-600">Calories Burned</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaWeight className="text-2xl text-indigo-500" />
            <div className="flex items-center gap-1 text-sm text-green-500">
              <FaArrowDown />
              <span>{loading || !stats ? '--' : stats.weightProgress}kg</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{loading || !stats ? '--' : stats.weightProgress}kg</h3>
          <p className="text-slate-600">Weight Progress</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Profile Summary */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
              <FaUser className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Profile Summary</h2>
          </div>
          
          {profile ? (
            <div className="space-y-4">
              {/* Profile Image */}
              <div className="text-center mb-4">
                {profile.imageUrl ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg mx-auto mb-3">
                    <Image 
                      src={profile.imageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaUser className="text-white text-2xl" />
                  </div>
                )}
                <h3 className="font-bold text-slate-800">{profile.name || 'Your Name'}</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <FaUser className="text-slate-400" />
                <span className="text-slate-700">{profile.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaHeart className="text-slate-400" />
                <span className="text-slate-700">{profile.age} years old</span>
              </div>
              <div className="flex items-center gap-3">
                <FaWeight className="text-slate-400" />
                <span className="text-slate-700">{profile.weight} kg</span>
              </div>
              <div className="flex items-center gap-3">
                <FaRulerVertical className="text-slate-400" />
                <span className="text-slate-700">{profile.height} cm</span>
              </div>
              <div className="flex items-center gap-3">
                <FaLeaf className="text-slate-400" />
                <span className="text-slate-700">{profile.diet || 'Not specified'}</span>
              </div>
              {bmi && (
                <div className="mt-4 p-3 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">BMI: {bmi}</span>
                    <span className={`px-2 py-1 rounded text-sm ${bmiInfo?.color} ${bmiInfo?.bg}`}>
                      {bmiInfo?.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaUser className="text-4xl text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">Complete your profile to see personalized insights</p>
              <Link href="/profile" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300">
                Update Profile
              </Link>
            </div>
          )}
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
              <FaChartLine className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Weekly Activity</h2>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 w-12">{day.day}</span>
                <div className="flex items-center gap-4 flex-1 ml-4">
                  <div className="flex items-center gap-2">
                    <FaDumbbell className="text-indigo-500" />
                    <span className="text-sm text-slate-600">{day.workouts}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUtensils className="text-emerald-500" />
                    <span className="text-sm text-slate-600">{day.meals}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFire className="text-orange-500" />
                    <span className="text-sm text-slate-600">{day.calories}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <FaCalendarAlt className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Today's Schedule</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FaUtensils className="text-emerald-500" />
                Meals
              </h3>
              <div className="space-y-2">
                {todayMeals.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <div>
                      <span className="font-medium text-slate-700">{meal.name}</span>
                      <span className="text-sm text-slate-500 ml-2">{meal.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {meal.status === 'completed' ? 
                        <FaCheckCircle className="text-green-500" /> : 
                        <FaClock className="text-orange-500" />
                      }
                      <span className="text-sm text-slate-600">{meal.calories} cal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FaDumbbell className="text-indigo-500" />
                Workouts
              </h3>
              <div className="space-y-2">
                {todayWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <div>
                      <span className="font-medium text-slate-700">{workout.name}</span>
                      <span className="text-sm text-slate-500 ml-2">{workout.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {workout.status === 'completed' ? 
                        <FaCheckCircle className="text-green-500" /> : 
                        <FaClock className="text-orange-500" />
                      }
                      <span className="text-sm text-slate-600">{workout.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/meals" className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <FaUtensils className="text-2xl" />
            <div>
              <h3 className="font-bold text-lg">View Meals</h3>
              <p className="text-emerald-100">Check your meal plan</p>
            </div>
          </div>
        </Link>

        <Link href="/workouts" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <FaDumbbell className="text-2xl" />
            <div>
              <h3 className="font-bold text-lg">View Workouts</h3>
              <p className="text-indigo-100">Check your workout plan</p>
            </div>
          </div>
        </Link>

        <Link href="/test" className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <FaBullseye className="text-2xl" />
            <div>
              <h3 className="font-bold text-lg">Take Test</h3>
              <p className="text-orange-100">Track your progress</p>
            </div>
          </div>
        </Link>

        <Link href="/progress" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <FaChartLine className="text-2xl" />
            <div>
              <h3 className="font-bold text-lg">View Progress</h3>
              <p className="text-green-100">See your achievements</p>
            </div>
          </div>
        </Link>

        <Link href="/profile" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <FaUser className="text-2xl" />
            <div>
              <h3 className="font-bold text-lg">Update Profile</h3>
              <p className="text-blue-100">Manage your details</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
            <FaLightbulb className="text-white text-xl" />
          </div>
    <div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">Today's Insights</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                <span>Great job! You're on a {loading || !stats ? '--' : stats.workoutStreak}-day workout streak</span>
              </li>
              <li className="flex items-center gap-2">
                <FaUtensils className="text-emerald-500" />
                <span>Your meal adherence is {loading || !stats ? '--' : stats.mealAdherence}% - keep it up!</span>
              </li>
              <li className="flex items-center gap-2">
                <FaFire className="text-orange-500" />
                <span>You've burned {loading || !stats ? '--' : stats.caloriesBurned} calories this week</span>
              </li>
              <li className="flex items-center gap-2">
                <FaBullseye className="text-indigo-500" />
                <span>You're {(loading || !stats || typeof stats.weightProgress !== 'number') ? '--' : Math.abs(stats.weightProgress)}kg closer to your goal</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
    </section>
  );
} 