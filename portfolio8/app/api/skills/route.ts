import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import skill from '@/models/skill';
export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newSkill = await skill.create(body);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const skills = await skill.find({}).sort({ createdAt: -1 });
    return NextResponse.json(skills, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}