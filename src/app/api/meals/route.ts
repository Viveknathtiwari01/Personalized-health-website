import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({}, { status: 401 });
  
  try {
    const user = await prisma.user.findUnique({ 
      where: { clerkId: userId },
      include: { mealPlan: true }
    });
    
    if (!user) return NextResponse.json({}, { status: 404 });
    
    console.log('Fetched meal plan for user:', userId, 'Plan:', user.mealPlan);
    return NextResponse.json(user.mealPlan);
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    return NextResponse.json({ error: 'Failed to fetch meal plan' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({}, { status: 401 });
  
  try {
    const data = await req.json();
    const { plan, generatedAt } = data;
    
    console.log('Saving meal plan for user:', userId, 'Plan length:', plan?.length);
    
    // Get user email from Clerk
    let email = undefined;
    try {
      const clerkUser = await currentUser();
      email = clerkUser?.emailAddresses?.[0]?.emailAddress;
    } catch (e) {
      console.log('Could not fetch Clerk user for email:', e);
    }
    
    // Find or create user
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: { email },
      create: { 
        clerkId: userId,
        email,
        name: 'User' // Default name
      },
    });
    
    // Upsert meal plan
    const mealPlan = await prisma.mealPlan.upsert({
      where: { userId: user.id },
      update: {
        plan,
        generatedAt: new Date(generatedAt || Date.now()),
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        plan,
        generatedAt: new Date(generatedAt || Date.now()),
        updatedAt: new Date()
      },
    });
    
    console.log('Meal plan saved successfully:', mealPlan.id);
    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error('Error saving meal plan:', error);
    return NextResponse.json({ error: 'Failed to save meal plan' }, { status: 500 });
  }
} 