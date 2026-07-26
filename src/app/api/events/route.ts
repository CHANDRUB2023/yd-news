import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function GET() {
  try {
    const events = mockDb.getEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.titleEn || !body.titleTa || !body.date || !body.locationEn || !body.locationTa) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newEvent = mockDb.createEvent(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
