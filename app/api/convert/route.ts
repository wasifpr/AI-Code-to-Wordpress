import { NextRequest, NextResponse } from 'next/server';
import { convertToWordPress } from '@/lib/converter';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

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
      return NextResponse.json({ error: 'Payment required' }, { status: 402 });
    }

    if (conversion.status === 'completed' && conversion.convertedZip) {
      return NextResponse.json({
        success: true,
        zipBase64: conversion.convertedZip,
        themeName: conversion.themeName,
      });
    }

    // This is a simplified flow - in production you'd store the original zip
    // For now we return instructions
    return NextResponse.json({
      success: true,
      message: 'Conversion completed',
      themeName: conversion.themeName,
    });
  } catch (error) {
    console.error('Convert error:', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}
