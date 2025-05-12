import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const organizerId = req.nextUrl.searchParams.get('organizerId');

  if (!organizerId) {
    return NextResponse.json({ error: 'Missing organizerID' }, { status: 400 });
  }

  try {
    const response = await fetch(`http://localhost:3001/organizer/${organizerId}/users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}