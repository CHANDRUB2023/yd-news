import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const initialGalleryPhotos = [
  { 
    id: '1', 
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', 
    localUrl: '/img/gallery-1.jpg', 
    titleEn: 'Green Tamil Nadu Reforestation Drive', 
    titleTa: 'பசுமைத் தமிழ்நாடு காடமைப்பு இயக்கம்',
    date: '2026-07-20'
  },
  { 
    id: '2', 
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800', 
    localUrl: '/img/gallery-2.jpg', 
    titleEn: 'Youth Rally in Chennai Headquarters', 
    titleTa: 'சென்னை தலைமை அலுவலகத்தில் இளைஞர் பேரணி',
    date: '2026-07-18'
  },
  { 
    id: '3', 
    url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800', 
    localUrl: '/img/gallery-3.jpg', 
    titleEn: "Women's Wing Conclave 2026", 
    titleTa: 'மகளிர் அணி மாநாடு 2026',
    date: '2026-07-15'
  },
  { 
    id: '4', 
    url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800', 
    localUrl: '/img/gallery-4.jpg', 
    titleEn: 'District Leadership Assembly', 
    titleTa: 'மாவட்ட நிர்வாகிகள் கூட்டம்',
    date: '2026-07-12'
  },
  { 
    id: '5', 
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800', 
    localUrl: '/img/gallery-5.jpg', 
    titleEn: 'Student Rights Public Forum', 
    titleTa: 'மாணவர் உரிமைகள் பொது மன்றம்',
    date: '2026-07-10'
  },
  { 
    id: '6', 
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800', 
    localUrl: '/img/gallery-6.jpg', 
    titleEn: 'Volunteer Training Workshop', 
    titleTa: 'தன்னார்வலர் பயிற்சி முகாம்',
    date: '2026-07-08'
  }
];

export async function GET() {
  return NextResponse.json(initialGalleryPhotos);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const titleEn = (formData.get('titleEn') as string) || 'Uploaded Event Image';
    const titleTa = (formData.get('titleTa') as string) || 'பதிவேற்றப்பட்ட படம்';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imgDir = path.join(process.cwd(), 'public', 'img');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    const filename = `gallery-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const filePath = path.join(imgDir, filename);

    fs.writeFileSync(filePath, buffer);

    const savedPhoto = {
      id: String(Date.now()),
      url: `/img/${filename}`,
      localUrl: `/img/${filename}`,
      titleEn,
      titleTa,
      date: new Date().toISOString().split('T')[0]
    };

    initialGalleryPhotos.unshift(savedPhoto);

    return NextResponse.json({ success: true, photo: savedPhoto });
  } catch (error) {
    console.error('Failed to save image to public/img:', error);
    return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
  }
}
