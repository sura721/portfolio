import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newTestimonial = await Testimonial.create({
      ...body,
      status: body.status ?? 'pending',
    });
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let filter = {};

    if (status === 'pending') {
      filter = { status: 'pending' };
    } else if (status === 'approved') {
      filter = { status: 'approved' };
    } else if (status === 'rejected') {
      filter = { status: 'rejected' };
    } else if (status === 'all') {
      filter = {};
    } else {
      filter = { $or: [{ status: 'approved' }, { status: { $exists: false } }] };
    }

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
