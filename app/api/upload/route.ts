import { NextRequest, NextResponse } from 'next/server';
import { generatePreview } from '@/lib/converter';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const platform = formData.get('platform') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.zip')) {
      return NextResponse.json({ error: 'Only .zip files are accepted' }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const preview = await generatePreview(buffer, file.name);

    const sessionId = randomUUID();

    await prisma.conversion.create({
      data: {
        sessionId,
        originalName: file.name,
        platform: platform || preview.detectedPlatform,
        status: 'previewed',
        fileCount: preview.files.length,
        themeName: preview.themeName,
        previewData: JSON.stringify(preview),
      },
    });

    return NextResponse.json({
      sessionId,
      preview,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
