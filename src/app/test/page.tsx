'use client'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaChartLine, 
  FaDumbbell, 
  FaUtensils, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaTrophy,
  FaCalendarAlt,
  FaBullseye,
  FaLightbulb,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaHome
} from 'react-icons/fa';

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

type TestData = {
  date: string;
  workoutCompleted: boolean;
  mealsFollowed: boolean;
  extraWorkout: boolean;
  missedMeals: number;
  extraCalories: number;
  notes: string;
};

export default function TestPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <TestSection />
      </SignedIn>
    </>
  )
}

function TestSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [testData, setTestData] = useState<TestData[]>([]);
  const [currentTest, setCurrentTest] = useState<TestData>({
    date: new Date().toISOString().split('T')[0],
    workoutCompleted: false,
    mealsFollowed: false,
    extraWorkout: false,
    missedMeals: 0,
    extraCalories: 0,
    notes: ''
  });

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.ok ? res.json() : null)
      .then(data => setProfile(data))
      .catch(() => setProfile(null));
    
    // Load sample test data
    const sampleData: TestData[] = [
      {
        date: '2024-01-15',
        workoutCompleted: true,
        mealsFollowed: true,
        extraWorkout: false,
        missedMeals: 0,
        extraCalories: 0,
        notes: 'Great day! Followed plan perfectly.'
      },
      {
        date: '2024-01-16',
        workoutCompleted: true,
        mealsFollowed: false,
        extraWorkout: true,
        missedMeals: 1,
        extraCalories: 200,
        notes: 'Missed lunch but did extra cardio.'
      },
      {
        date: '2024-01-17',
        workoutCompleted: false,
        mealsFollowed: true,
        extraWorkout: false,
        missedMeals: 0,
        extraCalories: -150,
        notes: 'Skipped workout due to busy schedule.'
      }
    ];
    setTestData(sampleData);
  }, []);

  const handleSubmitTest = () => {
    setTestData([...testData, currentTest]);
    setCurrentTest({
      date: new Date().toISOString().split('T')[0],
      workoutCompleted: false,
      mealsFollowed: false,
      extraWorkout: false,
      missedMeals: 0,
      extraCalories: 0,
      notes: ''
    });
  };

  const calculateStats = () => {
    const total = testData.length;
    const workoutCompletion = (testData.filter(d => d.workoutCompleted).length / total) * 100;
    const mealAdherence = (testData.filter(d => d.mealsFollowed).length / total) * 100;
    const averageMissedMeals = testData.reduce((sum, d) => sum + d.missedMeals, 0) / total;
    const averageExtraCalories = testData.reduce((sum, d) => sum + d.extraCalories, 0) / total;
    
    return { workoutCompletion, mealAdherence, averageMissedMeals, averageExtraCalories };
  };

  const getProgressTrend = () => {
    if (testData.length < 2) return 'neutral';
    const recent = testData.slice(-3);
    const older = testData.slice(-6, -3);
    
    const recentAvg = recent.reduce((sum, d) => sum + (d.workoutCompleted ? 1 : 0), 0) / recent.length;
    const olderAvg = older.reduce((sum, d) => sum + (d.workoutCompleted ? 1 : 0), 0) / older.length;
    
    if (recentAvg > olderAvg) return 'up';
    if (recentAvg < olderAvg) return 'down';
    return 'neutral';
  };

  if (!profile || !profile.name) {
    return (
      <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl shadow-lg animate-fade-in">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">Fitness Testing & Progress</h1>
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 text-center">
          <div className="text-lg text-slate-700 mb-4">To track your fitness progress and take tests, please update your profile first.</div>
          <Link href="/profile" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">Go to Profile</Link>
        </div>
      </section>
    );
  }

  const stats = calculateStats();
  const trend = getProgressTrend();

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-orange-700 drop-shadow-lg">Daily Progress Test</h1>
        <Link href="/dashboard" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <FaHome className="text-lg" />
          Dashboard
        </Link>
      </div>
      
      {/* Progress Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <FaDumbbell className="text-2xl text-indigo-500" />
            <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
              {trend === 'up' ? <FaArrowUp /> : trend === 'down' ? <FaArrowDown /> : <FaMinus />}
              <span>{trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{stats.workoutCompletion.toFixed(0)}%</h3>
          <p className="text-slate-600">Workout Completion</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <FaUtensils className="text-2xl text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{stats.mealAdherence.toFixed(0)}%</h3>
          <p className="text-slate-600">Meal Adherence</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <FaExclamationTriangle className="text-2xl text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{stats.averageMissedMeals.toFixed(1)}</h3>
          <p className="text-slate-600">Avg Missed Meals</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-2xl text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{stats.averageExtraCalories > 0 ? '+' : ''}{stats.averageExtraCalories.toFixed(0)}</h3>
          <p className="text-slate-600">Avg Extra Calories</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Daily Test Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
              <FaBullseye className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Daily Progress Test</h2>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitTest(); }} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Date</label>
              <input
                type="date"
                value={currentTest.date}
                onChange={(e) => setCurrentTest({...currentTest, date: e.target.value})}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="workout"
                  checked={currentTest.workoutCompleted}
                  onChange={(e) => setCurrentTest({...currentTest, workoutCompleted: e.target.checked})}
                  className="w-5 h-5 text-indigo-600"
                />
                <label htmlFor="workout" className="font-semibold">Workout Completed</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="meals"
                  checked={currentTest.mealsFollowed}
                  onChange={(e) => setCurrentTest({...currentTest, mealsFollowed: e.target.checked})}
                  className="w-5 h-5 text-emerald-600"
                />
                <label htmlFor="meals" className="font-semibold">Meals Followed</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="extra"
                  checked={currentTest.extraWorkout}
                  onChange={(e) => setCurrentTest({...currentTest, extraWorkout: e.target.checked})}
                  className="w-5 h-5 text-purple-600"
                />
                <label htmlFor="extra" className="font-semibold">Extra Workout</label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Missed Meals</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={currentTest.missedMeals}
                  onChange={(e) => setCurrentTest({...currentTest, missedMeals: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-2">Extra Calories</label>
                <input
                  type="number"
                  value={currentTest.extraCalories}
                  onChange={(e) => setCurrentTest({...currentTest, extraCalories: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  placeholder="+/- calories"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Notes</label>
              <textarea
                value={currentTest.notes}
                onChange={(e) => setCurrentTest({...currentTest, notes: e.target.value})}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                rows={3}
                placeholder="How was your day? Any challenges or achievements?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Submit Daily Test
            </button>
          </form>
        </div>

        {/* Progress History */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
              <FaChartLine className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Progress History</h2>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {testData.map((test, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800">{new Date(test.date).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    {test.workoutCompleted ? 
                      <FaCheckCircle className="text-green-500" title="Workout Completed" /> : 
                      <FaTimesCircle className="text-red-500" title="Workout Missed" />
                    }
                    {test.mealsFollowed ? 
                      <FaCheckCircle className="text-green-500" title="Meals Followed" /> : 
                      <FaTimesCircle className="text-red-500" title="Meals Missed" />
                    }
                    {test.extraWorkout && <FaTrophy className="text-yellow-500" title="Extra Workout" />}
                  </div>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  {test.missedMeals > 0 && <p>❌ Missed {test.missedMeals} meal(s)</p>}
                  {test.extraCalories !== 0 && (
                    <p className={test.extraCalories > 0 ? 'text-orange-600' : 'text-green-600'}>
                      {test.extraCalories > 0 ? '+' : ''}{test.extraCalories} calories
                    </p>
                  )}
                  {test.notes && <p className="italic">"{test.notes}"</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
            <FaLightbulb className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">Insights & Recommendations</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-2">
                <FaChartLine className="text-indigo-500" />
                <span>Your workout completion rate is {stats.workoutCompletion.toFixed(0)}% - {stats.workoutCompletion >= 80 ? 'Excellent consistency!' : 'Try to improve consistency'}</span>
              </li>
              <li className="flex items-center gap-2">
                <FaUtensils className="text-emerald-500" />
                <span>Meal adherence: {stats.mealAdherence.toFixed(0)}% - {stats.mealAdherence >= 90 ? 'Great job following your meal plan!' : 'Focus on meal planning'}</span>
              </li>
              <li className="flex items-center gap-2">
                <FaBullseye className="text-orange-500" />
                <span>Average {stats.averageMissedMeals.toFixed(1)} missed meals per day - {stats.averageMissedMeals <= 0.5 ? 'Good meal consistency!' : 'Plan meals ahead'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 