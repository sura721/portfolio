import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Education from '@/models/Education';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Education ID is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    const deletedEducation = await Education.findByIdAndDelete(id);

    if (!deletedEducation) {
      return NextResponse.json({ error: 'Education entry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Education entry deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete education entry:', error);
    return NextResponse.json({ error: 'Failed to delete education entry' }, { status: 500 });
  }
}
