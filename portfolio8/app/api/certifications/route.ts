import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Certification from '@/models/Certification';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newCertification = await Certification.create(body);
    return NextResponse.json(newCertification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const certifications = await Certification.find({}).sort({ createdAt: -1 });
    return NextResponse.json(certifications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
  }
}
