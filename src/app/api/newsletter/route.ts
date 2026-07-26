import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function GET() {
  try {
    const list = mockDb.getNewsletterSubscribers();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch newsletter list' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const result = mockDb.subscribeNewsletter(body.email);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe to newsletter' }, { status: 500 });
  }
}
