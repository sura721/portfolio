
import { NextResponse } from 'next/server';
 import Project from '@/models/Project';
import { connectToDB } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}