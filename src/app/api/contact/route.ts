import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    console.log('=== Contact API POST Request Start ===');
    
    const data = await req.json();
    console.log('Contact form data received:', data);

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      console.log('Missing required fields');
      return NextResponse.json({ 
        error: 'Missing required fields: name, email, and message are required' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log('Invalid email format');
      return NextResponse.json({ 
        error: 'Please provide a valid email address' 
      }, { status: 400 });
    }

    // Validate message length
    if (data.message.length < 10) {
      console.log('Message too short');
      return NextResponse.json({ 
        error: 'Message must be at least 10 characters long' 
      }, { status: 400 });
    }

    // Save contact form submission to database
    const contact = await prisma.contact.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
      },
    });

    console.log('Contact form saved successfully:', contact);

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We\'ll get back to you soon.',
      contactId: contact.id 
    });

  } catch (error) {
    console.error('Contact API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to send message. Please try again later.',
      details: errorMessage 
    }, { status: 500 });
  }
} 