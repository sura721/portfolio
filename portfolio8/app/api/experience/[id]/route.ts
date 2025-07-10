
import { NextResponse } from 'next/server';
 import Experience from '@/models/Experience';
import { connectToDB } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Experience deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}