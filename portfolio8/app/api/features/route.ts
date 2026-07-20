import { NextResponse } from 'next/server';
import Feature from '@/models/Feature';
import { connectToDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newFeature = await Feature.create(body);
    return NextResponse.json(newFeature, { status: 201 });
  } catch (error) {
    console.error('Failed to create feature:', error);
    return NextResponse.json({ error: 'Failed to create feature' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const features = await Feature.find({}).sort({ createdAt: -1 });
    return NextResponse.json(features, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch features:', error);
    return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
  }
}
