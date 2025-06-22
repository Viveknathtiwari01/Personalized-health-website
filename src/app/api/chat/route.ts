import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { askGeminiChat } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { conversationId, message } = await req.json();
  if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });

  // Find internal user
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  let conversation;
  if (conversationId) {
    conversation = await prisma.conversation.findUnique({
      where: { id: conversationId, userId: user.id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!conversation) return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
  } else {
    conversation = await prisma.conversation.create({
      data: { userId: user.id },
      include: { messages: true },
    });
  }

  // Store user message
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: 'user',
      text: message,
    },
  });

  // Get AI response
  let aiText = '';
  try {
    aiText = await askGeminiChat(message);
  } catch (_e) {
    aiText = 'Sorry, there was an error.';
  }

  // Store AI message
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: 'ai',
      text: aiText,
    },
  });

  // Return updated conversation
  const updated = await prisma.conversation.findUnique({
    where: { id: conversation.id },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  });
  return NextResponse.json({ conversation: updated });
}

export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // Find internal user
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const url = new URL(req.url);
  const conversationId = url.searchParams.get('conversationId');
  if (conversationId) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId, userId: user.id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!conversation) return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    return NextResponse.json({ conversation });
  } else {
    const conversations = await prisma.conversation.findMany({
      where: { userId: user.id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ conversations });
  }
} 