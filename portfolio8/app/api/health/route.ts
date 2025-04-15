
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log(`[${new Date().toISOString()}] Portfolio Health check ping received.`);

  return NextResponse.json(
    { status: 'ok', message: 'Portfolio is healthy.' },
    { status: 200 }
  );
}