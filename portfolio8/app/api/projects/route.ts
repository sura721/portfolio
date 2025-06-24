import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/db'
import Project from '@/models/Project'

export async function GET() {
  try {
    await connectToDB()
    const projects = await Project.find().sort({ createdAt: -1 }) 
    console.log(projects)
    return NextResponse.json(projects)
  } catch (err) {
    console.error('Error fetching projects:', err)
    return NextResponse.json({ error: 'connection failed..' }, { status: 500 })
  }
}
