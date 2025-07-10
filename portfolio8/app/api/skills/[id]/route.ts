// app/api/skills/[id]/route.ts

import { connectToDB } from '@/lib/db';
import skill from '@/models/skill';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    const deletedSkill = await skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Skill deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}