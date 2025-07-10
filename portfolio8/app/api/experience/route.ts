import { NextResponse } from 'next/server';
import Experience from '@/models/Experience';
import { connectToDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newExperience = await Experience.create(body);
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const experiences = await Experience.find({}).sort({ createdAt: -1 });
    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}