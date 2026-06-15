import { NextRequest, NextResponse } from 'next/server';
import { convertToWordPress } from '@/lib/converter';
import { prisma } from '@/lib/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body as { sessionId: string };

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const conversion = await prisma.conversion.findUnique({
      where: { sessionId },
      include: { payment: true },
    });

    if (!conversion) {
      return NextResponse.json({ error: 'Conversion not found' }, { status: 404 });
    }

    if (!conversion.payment || conversion.payment.status !== 'paid') {
      return NextResponse.json({ error: 'Payment required to download' }, { status: 402 });
    }

    // Return cached zip if already converted
    if (conversion.status === 'completed' && conversion.convertedZip) {
      return NextResponse.json({
        success: true,
        zipBase64: conversion.convertedZip,
        themeName: conversion.themeName,
      });
    }

    // Read original zip from tmp
    const zipPath = join('/tmp', 'aicode2wp', `${sessionId}.zip`);
    if (!existsSync(zipPath)) {
      return NextResponse.json(
        { error: 'Source file expired. Please re-upload your zip.' },
        { status: 410 }
      );
    }

    const zipBuffer = await readFile(zipPath);
    const themeName = conversion.themeName || 'my-wp-theme';

    const convertedZip = await convertToWordPress(zipBuffer, themeName);
    const zipBase64 = convertedZip.toString('base64');

    // Cache the result
    await prisma.conversion.update({
      where: { sessionId },
      data: { status: 'completed', convertedZip: zipBase64 },
    });

    return NextResponse.json({ success: true, zipBase64, themeName });
  } catch (error) {
    console.error('Convert error:', error);
    return NextResponse.json({ error: 'Conversion failed. Please contact support.' }, { status: 500 });
  }
}
