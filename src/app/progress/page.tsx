'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaChartLine, 
  FaDumbbell, 
  FaUtensils, 
  FaTrophy, 
  FaFire, 
  FaHeart, 
  FaBullseye,
  FaRunning,
  FaWeight,
  FaRulerVertical,
  FaLightbulb,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCheckCircle,
  FaMedal,
  FaStar,
  FaChartBar,
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

type ProgressData = {
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  caloriesBurned: number;
  workoutsCompleted: number;
  mealsFollowed: number;
};

export default function ProgressPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <ProgressContent />
      </SignedIn>
    </>
  )
}

function ProgressContent() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.ok ? res.json() : null)
      .then(data => setProfile(data))
      .catch(() => setProfile(null));
    
    // Sample progress data
    const sampleData: ProgressData[] = [
      { date: '2024-01-01', weight: 75, bodyFat: 22, muscleMass: 45, caloriesBurned: 1800, workoutsCompleted: 5, mealsFollowed: 18 },
      { date: '2024-01-08', weight: 74.5, bodyFat: 21.5, muscleMass: 45.5, caloriesBurned: 1950, workoutsCompleted: 6, mealsFollowed: 19 },
      { date: '2024-01-15', weight: 74, bodyFat: 21, muscleMass: 46, caloriesBurned: 2100, workoutsCompleted: 7, mealsFollowed: 20 },
      { date: '2024-01-22', weight: 73.5, bodyFat: 20.5, muscleMass: 46.5, caloriesBurned: 2250, workoutsCompleted: 7, mealsFollowed: 21 },
      { date: '2024-01-29', weight: 73, bodyFat: 20, muscleMass: 47, caloriesBurned: 2400, workoutsCompleted: 8, mealsFollowed: 21 }
    ];
    setProgressData(sampleData);
  }, []);

  const calculateProgress = () => {
    if (progressData.length < 2) return null;
    const latest = progressData[progressData.length - 1];
    const first = progressData[0];
    
    return {
      weightLoss: first.weight - latest.weight,
      bodyFatReduction: first.bodyFat - latest.bodyFat,
      muscleGain: latest.muscleMass - first.muscleMass,
      caloriesIncrease: latest.caloriesBurned - first.caloriesBurned,
      workoutImprovement: latest.workoutsCompleted - first.workoutsCompleted,
      mealImprovement: latest.mealsFollowed - first.mealsFollowed
    };
  };

  const getAchievements = () => [
    { title: 'Weight Loss Champion', description: 'Lost 2kg in 4 weeks', icon: FaTrophy, color: 'text-yellow-500', achieved: true },
    { title: 'Consistency Master', description: '7-day workout streak', icon: FaMedal, color: 'text-blue-500', achieved: true },
    { title: 'Nutrition Expert', description: '95% meal adherence', icon: FaStar, color: 'text-green-500', achieved: true },
    { title: 'Calorie Burner', description: 'Burn 2500+ calories/week', icon: FaFire, color: 'text-orange-500', achieved: false }
  ];

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return { direction: 'up', color: 'text-green-500', icon: FaArrowUp };
    if (current < previous) return { direction: 'down', color: 'text-red-500', icon: FaArrowDown };
    return { direction: 'stable', color: 'text-gray-500', icon: FaMinus };
  };

  const progress = calculateProgress();

  if (!profile || !profile.name) {
    return (
      <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 rounded-2xl shadow-lg animate-fade-in">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">Progress Tracking</h1>
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 text-center">
          <div className="text-lg text-slate-700 mb-4">To track your fitness progress, please update your profile first.</div>
          <Link href="/profile" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">Go to Profile</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-lg">Progress Tracking</h1>
        <Link href="/dashboard" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <FaHome className="text-lg" />
          Dashboard
        </Link>
      </div>
      
      {/* Period Selector */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-2 inline-flex">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaWeight className="text-2xl text-indigo-500" />
            {progress && (
              <div className={`flex items-center gap-1 text-sm ${getTrend(progressData[progressData.length - 1]?.weight || 0, progressData[0]?.weight || 0).color}`}>
                {(() => {
                  const IconComponent = getTrend(progressData[progressData.length - 1]?.weight || 0, progressData[0]?.weight || 0).icon;
                  return <IconComponent />;
                })()}
                <span>{Math.abs(progress.weightLoss).toFixed(1)}kg</span>
              </div>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{progressData[progressData.length - 1]?.weight || 0}kg</h3>
          <p className="text-slate-600">Current Weight</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaFire className="text-2xl text-orange-500" />
            {progress && (
              <div className={`flex items-center gap-1 text-sm ${getTrend(progressData[progressData.length - 1]?.caloriesBurned || 0, progressData[0]?.caloriesBurned || 0).color}`}>
                {(() => {
                  const IconComponent = getTrend(progressData[progressData.length - 1]?.caloriesBurned || 0, progressData[0]?.caloriesBurned || 0).icon;
                  return <IconComponent />;
                })()}
                <span>+{progress.caloriesIncrease}</span>
              </div>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{progressData[progressData.length - 1]?.caloriesBurned || 0}</h3>
          <p className="text-slate-600">Calories Burned</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaDumbbell className="text-2xl text-purple-500" />
            {progress && (
              <div className={`flex items-center gap-1 text-sm ${getTrend(progressData[progressData.length - 1]?.muscleMass || 0, progressData[0]?.muscleMass || 0).color}`}>
                {(() => {
                  const IconComponent = getTrend(progressData[progressData.length - 1]?.muscleMass || 0, progressData[0]?.muscleMass || 0).icon;
                  return <IconComponent />;
                })()}
                <span>+{progress.muscleGain.toFixed(1)}kg</span>
              </div>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{progressData[progressData.length - 1]?.muscleMass || 0}kg</h3>
          <p className="text-slate-600">Muscle Mass</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <FaHeart className="text-2xl text-red-500" />
            {progress && (
              <div className={`flex items-center gap-1 text-sm ${getTrend(progressData[0]?.bodyFat || 0, progressData[progressData.length - 1]?.bodyFat || 0).color}`}>
                {(() => {
                  const IconComponent = getTrend(progressData[0]?.bodyFat || 0, progressData[progressData.length - 1]?.bodyFat || 0).icon;
                  return <IconComponent />;
                })()}
                <span>-{progress.bodyFatReduction.toFixed(1)}%</span>
              </div>
            )}
          </div>
          <h3 className="text-3xl font-bold text-slate-800">{progressData[progressData.length - 1]?.bodyFat || 0}%</h3>
          <p className="text-slate-600">Body Fat</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Progress Chart */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full">
              <FaChartLine className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Progress Chart</h2>
          </div>
          
          <div className="space-y-4">
            {progressData.map((data, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800">{new Date(data.date).toLocaleDateString()}</span>
                  <span className="text-sm text-slate-500">Week {index + 1}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-indigo-600">{data.weight}kg</div>
                    <div className="text-slate-500">Weight</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-600">{data.caloriesBurned}</div>
                    <div className="text-slate-500">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{data.muscleMass}kg</div>
                    <div className="text-slate-500">Muscle</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
                  <span>Workouts: {data.workoutsCompleted}</span>
                  <span>Meals: {data.mealsFollowed}</span>
                  <span>Body Fat: {data.bodyFat}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
              <FaTrophy className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Achievements</h2>
          </div>
          
          <div className="space-y-4">
            {getAchievements().map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.achieved 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                    : 'bg-gradient-to-r from-slate-50 to-gray-50 border-gray-200 opacity-60'
                }`}>
                  <div className="flex items-center gap-3">
                    <IconComponent className={`text-2xl ${achievement.color}`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{achievement.title}</h3>
                      <p className="text-sm text-slate-600">{achievement.description}</p>
                    </div>
                    {achievement.achieved && (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Goals & Next Steps */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-full">
              <FaBullseye className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Current Goals</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-slate-800">Target Weight</h3>
                <p className="text-sm text-slate-600">Goal: 70kg</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">70%</div>
                <div className="text-sm text-slate-500">Complete</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-slate-800">Body Fat</h3>
                <p className="text-sm text-slate-600">Goal: 18%</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">85%</div>
                <div className="text-sm text-slate-500">Complete</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-slate-800">Muscle Mass</h3>
                <p className="text-sm text-slate-600">Goal: 50kg</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">60%</div>
                <div className="text-sm text-slate-500">Complete</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
              <FaChartBar className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Next Steps</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <FaLightbulb className="text-orange-500 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-800">Increase Workout Intensity</h3>
                <p className="text-sm text-slate-600">Add 10% more weight to your strength training</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
              <FaUtensils className="text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-800">Optimize Nutrition</h3>
                <p className="text-sm text-slate-600">Increase protein intake to 1.6g per kg body weight</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <FaRunning className="text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-800">Add Cardio Sessions</h3>
                <p className="text-sm text-slate-600">Include 2 HIIT sessions per week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
            <FaLightbulb className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">Progress Insights</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                <span>Excellent progress! You've lost {progress?.weightLoss.toFixed(1)}kg in {progressData.length} weeks</span>
              </li>
              <li className="flex items-center gap-2">
                <FaFire className="text-orange-500" />
                <span>Your calorie burn has increased by {progress?.caloriesIncrease} calories per week</span>
              </li>
              <li className="flex items-center gap-2">
                <FaDumbbell className="text-purple-500" />
                <span>Muscle mass increased by {progress?.muscleGain.toFixed(1)}kg - great strength gains!</span>
              </li>
              <li className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <span>Body fat reduced by {progress?.bodyFatReduction.toFixed(1)}% - keep up the consistency!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 