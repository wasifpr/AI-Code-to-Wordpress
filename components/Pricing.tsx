'use client';
import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 19, yearly: 19 },
    period: 'one-time',
    description: 'Perfect for a single conversion',
    features: [
      'Full AI conversion',
      'Standard WordPress theme export (.zip)',
      'Basic functions.php & templates',
      'Instant download after payment',
      '24-hour preview before purchase',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: { monthly: 49, yearly: 39 },
    period: 'month',
    description: 'For professionals and small agencies',
    features: [
      '20 conversions per month',
      'White-label output (no footer credit)',
      'Priority processing (2x faster)',
      'Auto-generated header & footer',
      'Native WordPress blog conversion',
      'Custom post type detection',
      '10+ animation libraries supported',
      'Priority support',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Agency',
    price: { monthly: 249, yearly: 199 },
    period: 'month',
    description: 'For agencies and larger teams',
    features: [
      'Unlimited conversions',
      'Everything in Pro',
      'Up to 5 team seats',
      'Priority + parallel processing',
      'Dedicated Slack support',
      'White-label branding',
    ],
    cta: 'Start Agency',
    highlight: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-8">Start free, pay only when you download.</p>

          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                !yearly ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                yearly ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.highlight
                  ? 'border-2 border-primary-500 shadow-xl shadow-primary-100'
                  : 'border border-gray-200 shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.period !== 'one-time' && (
                    <span className="text-gray-500 text-sm">/{plan.period}</span>
                  )}
                  {plan.period === 'one-time' && (
                    <span className="text-gray-500 text-sm">one-time</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/convert"
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
