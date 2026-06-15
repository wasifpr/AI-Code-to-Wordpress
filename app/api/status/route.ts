import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  const conversion = await prisma.conversion.findUnique({
    where: { sessionId },
    include: { payment: true },
  });

  if (!conversion) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    status: conversion.status,
    paid: conversion.payment?.status === 'paid',
    themeName: conversion.themeName,
    completed: conversion.status === 'completed',
  });
}
