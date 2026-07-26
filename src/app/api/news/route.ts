import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function GET() {
  try {
    const news = mockDb.getNews();
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.titleEn || !body.titleTa || !body.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newArticle = mockDb.createNews(body);
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news article' }, { status: 500 });
  }
}
