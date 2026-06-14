import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const PLANS = {
  starter: {
    name: 'Starter Unlock',
    price: 1900, // $19.00 in cents
    description: 'One-time unlock - No subscription',
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
  },
  pro: {
    name: 'Pro',
    price: 4900,
    description: '20 conversions/month',
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
  },
  agency: {
    name: 'Agency',
    price: 24900,
    description: 'Unlimited conversions',
    priceId: process.env.STRIPE_AGENCY_PRICE_ID!,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
