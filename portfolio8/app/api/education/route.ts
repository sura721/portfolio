import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Education from '@/models/Education';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newEducation = await Education.create(body);
    return NextResponse.json(newEducation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education entry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const education = await Education.find({}).sort({ createdAt: -1 });
    return NextResponse.json(education, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education entries' }, { status: 500 });
  }
}
