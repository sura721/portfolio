import { NextResponse } from 'next/server';
import Feature from '@/models/Feature';
import { connectToDB } from '@/lib/db';

export async function DELETE(
  _req: Request,
  { params }: { params: { id?: string } }
) {
  try {
    await connectToDB();
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'Feature ID is required' }, { status: 400 });
    }

    const deletedFeature = await Feature.findByIdAndDelete(id);
    if (!deletedFeature) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Feature deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete feature:', error);
    return NextResponse.json({ error: 'Failed to delete feature' }, { status: 500 });
  }
}
