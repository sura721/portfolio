import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/db'
import skill from '@/models/skill'
export async function GET() {
  try {
    await connectToDB()
    const skills = await skill.find().sort({ createdAt: -1 }) 
    console.log(skills)
    return NextResponse.json(skills)
  } catch (err) {
    console.error('Error fetching skills:', err)
    return NextResponse.json({ error: 'connection failed..' }, { status: 500 })
  }
}
