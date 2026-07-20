import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Certification from '@/models/Certification';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Certification ID is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    const deletedCertification = await Certification.findByIdAndDelete(id);

    if (!deletedCertification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Certification deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete certification:', error);
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
}
