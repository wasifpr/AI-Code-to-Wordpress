import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS, PlanKey } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, plan = 'starter' } = body as { sessionId: string; plan: PlanKey };

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const conversion = await prisma.conversion.findUnique({ where: { sessionId } });
    if (!conversion) {
      return NextResponse.json({ error: 'Conversion not found' }, { status: 404 });
    }

    const planData = PLANS[plan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const isSubscription = plan === 'pro' || plan === 'agency';

    // Build line_items correctly for one-time vs subscription
    const line_items = isSubscription
      ? [{ price: planData.priceId, quantity: 1 }]
      : [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${planData.name} — WordPress Theme Conversion`,
                description: `Convert your AI-generated site to a WordPress theme (${planData.description})`,
              },
              unit_amount: planData.price,
            },
            quantity: 1,
          },
        ];

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: isSubscription ? 'subscription' : 'payment',
      line_items,
      success_url: `${appUrl}/convert/success?session_id={CHECKOUT_SESSION_ID}&conversion=${sessionId}`,
      cancel_url: `${appUrl}/convert?cancelled=true`,
      metadata: {
        conversionId: conversion.id,
        sessionId,
        plan,
      },
    });

    // Upsert payment record
    const existingPayment = await prisma.payment.findUnique({
      where: { conversionId: conversion.id },
    });

    if (existingPayment) {
      await prisma.payment.update({
        where: { conversionId: conversion.id },
        data: { stripeSessionId: checkoutSession.id, amount: planData.price, plan, status: 'pending' },
      });
    } else {
      await prisma.payment.create({
        data: {
          conversionId: conversion.id,
          stripeSessionId: checkoutSession.id,
          amount: planData.price,
          plan,
          status: 'pending',
        },
      });
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
