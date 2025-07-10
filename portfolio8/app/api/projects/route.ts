import { NextResponse } from 'next/server';
import Project from '@/models/Project';   
import { connectToDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectToDB();
    
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}