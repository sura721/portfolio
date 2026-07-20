import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newTestimonial = await Testimonial.create(body);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
