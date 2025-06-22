import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest) {
  try {
    const url = new URL(_req.url);
    const dashboard = url.searchParams.get('dashboard');
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (dashboard) {
      // Dynamic dashboard stats
      const user = await prisma.user.findUnique({ where: { clerkId: userId } });
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      // Workout streak: count consecutive days with a workout
      const workouts = await prisma.workout.findMany({
        where: { userId: user.id },
        orderBy: { date: 'desc' },
      });
      let streak = 0;
      let prev = new Date();
      for (const w of workouts) {
        const d = new Date(w.date);
        if (streak === 0) prev = d;
        if (Math.abs((prev.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)) <= 1) {
          streak++;
          prev = d;
        } else {
          break;
        }
      }
      // Meal adherence: percent of days with at least 3 meals
      const meals = await prisma.meal.findMany({ where: { userId: user.id } });
      const mealDays = new Map();
      for (const m of meals) {
        const day = m.date.toISOString().slice(0, 10);
        mealDays.set(day, (mealDays.get(day) || 0) + 1);
      }
      const adherence = mealDays.size > 0 ? Math.round([...mealDays.values()].filter(v => v >= 3).length / mealDays.size * 100) : 0;
      // Calories burned: sum of workout durations * 5 (simple estimate)
      const caloriesBurned = workouts.reduce((sum, w) => sum + (w.duration || 0) * 5, 0);
      // Weight progress: difference between first and last habit of type 'weight'
      const weightHabits = await prisma.habit.findMany({ where: { userId: user.id, type: 'weight' }, orderBy: { date: 'asc' } });
      let weightProgress = 0;
      if (weightHabits.length > 1) {
        weightProgress = weightHabits[weightHabits.length - 1].value - weightHabits[0].value;
      }
      // Weekly workouts and meals (last 7 days)
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weeklyWorkouts = workouts.filter(w => w.date >= weekAgo).length;
      const weeklyMeals = meals.filter(m => m.date >= weekAgo).length;
      return NextResponse.json({
        workoutStreak: streak,
        mealAdherence: adherence,
        caloriesBurned,
        weightProgress,
        weeklyWorkouts,
        weeklyMeals,
      });
    }
    // Test database connection
    try {
      const user = await prisma.user.findUnique({ where: { clerkId: userId } });
      console.log('GET - User found:', user);
      if (!user) {
        console.log('GET - No user found, returning 404');
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      console.log('GET - Returning user data');
      return NextResponse.json(user);
    } catch (dbError) {
      console.error('Database error in GET:', dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: errorMessage,
        hint: 'Check DATABASE_URL environment variable'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('GET request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(_req: NextRequest) {
  try {
    console.log('=== Profile API POST Request Start ===');
    const { userId } = await auth();
    console.log('userId:', userId);
    if (!userId) {
      console.log('No userId found, returning 401');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Simple database connection test
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('Database connection test successful');
    } catch (dbTestError) {
      console.error('Database connection test failed:', dbTestError);
      const errorMessage = dbTestError instanceof Error ? dbTestError.message : 'Unknown database error';
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: errorMessage,
        hint: 'Check DATABASE_URL environment variable and database accessibility'
      }, { status: 500 });
    }
    
    const data = await _req.json();
    console.log('profile data received:', data);

    // Validate required fields
    if (!data) {
      console.log('No data provided, returning 400');
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Try to fetch Clerk user for email
    let email = undefined;
    try {
      const clerkUser = await currentUser();
      email = clerkUser?.emailAddresses?.[0]?.emailAddress;
      console.log('Email from Clerk:', email);
    } catch (e) {
      console.log('Could not fetch Clerk user for email:', e);
    }

    // Check if this is an update to an existing profile
    const existingUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    console.log('Existing user found:', existingUser);
    const isUpdate = existingUser && (existingUser.name || existingUser.age || existingUser.weight || existingUser.height);
    console.log('Is update operation:', isUpdate);

    // Prepare the data for upsert
    const upsertData = {
      name: data.name || null,
      sex: data.sex || null,
      age: data.age ? parseInt(data.age) : null,
      weight: data.weight ? parseFloat(data.weight) : null,
      height: data.height ? parseFloat(data.height) : null,
      issues: data.issues || null,
      motive: data.motive || null,
      goal: data.goal || null,
      diet: data.diet || null,
      imageUrl: data.imageUrl || null,
      email: email,
    };
    
    console.log('Upsert data prepared:', upsertData);

    // Upsert user profile
    let user;
    try {
      console.log('Starting upsert operation...');
      user = await prisma.user.upsert({
        where: { clerkId: userId },
        update: upsertData,
        create: {
          clerkId: userId,
          ...upsertData
        },
      });
      console.log('User upserted successfully:', user);
    } catch (upsertError) {
      console.error('Upsert operation failed:', upsertError);
      console.error('Error details:', {
        name: upsertError instanceof Error ? upsertError.name : 'Unknown',
        message: upsertError instanceof Error ? upsertError.message : 'Unknown error',
        stack: upsertError instanceof Error ? upsertError.stack : 'No stack trace'
      });
      const errorMessage = upsertError instanceof Error ? upsertError.message : 'Unknown upsert error';
      return NextResponse.json({ 
        error: 'Failed to save profile', 
        details: errorMessage,
        hint: 'Check database schema and connection'
      }, { status: 500 });
    }

    // If this is an update and the user has existing meal/workout plans, mark them for regeneration
    if (isUpdate) {
      // Check if user has meal plan
      const existingMealPlan = await prisma.mealPlan.findUnique({
        where: { userId: user.id }
      });

      // Check if user has workout plan
      const existingWorkoutPlan = await prisma.workoutPlan.findUnique({
        where: { userId: user.id }
      });

      console.log('Existing meal plan:', existingMealPlan);
      console.log('Existing workout plan:', existingWorkoutPlan);

      // Return response with regeneration flags
      const response = {
        ...user,
        shouldRegenerateMeals: !!existingMealPlan,
        shouldRegenerateWorkouts: !!existingWorkoutPlan
      };
      
      console.log('Sending response with regeneration flags:', response);
      return NextResponse.json(response);
    }

    console.log('Sending response for new user:', user);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Profile API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: errorMessage,
      hint: 'Check server logs for more details'
    }, { status: 500 });
  }
} 