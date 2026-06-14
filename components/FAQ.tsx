'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'What does AICode2WP actually do?',
    a: 'AICode2WP uses Claude AI to convert your HTML/CSS/JS website (from any AI builder or custom code) into a fully structured WordPress theme. It generates index.php, header.php, footer.php, functions.php, style.css, and all your supporting assets.',
  },
  {
    q: 'What file formats do you accept?',
    a: 'We accept .zip files containing your exported website. This works with any AI builder export: Lovable, v0.dev, Cursor, Bolt.new, Replit, Google AI Studio, Framer, and more.',
  },
  {
    q: 'Is the preview really free?',
    a: 'Yes! Upload your .zip and get a free preview showing the converted file structure, theme name, detected platform, and what the WordPress theme will include. Payment is only required to download the full .zip.',
  },
  {
    q: 'Can I convert a React or Next.js project?',
    a: 'Yes, for static exports (next export or vite build). If your site has server-side logic, databases, or API routes, those parts need to be rebuilt in WordPress after conversion — but the design and templates will be converted.',
  },
  {
    q: 'Is my uploaded code secure?',
    a: 'Yes. Files are processed in memory and not stored permanently. Your source code is never shared or used for training.',
  },
  {
    q: 'Can I use the converted theme on multiple sites?',
    a: 'The Starter plan is per-conversion. Pro and Agency plans include multiple conversions per month and white-label output. You own the code you download and can use it as you wish.',
  },
  {
    q: 'How long does conversion take?',
    a: 'Typically under 5 minutes. Complex multi-page sites may take slightly longer as each page is processed by Claude AI.',
  },
  {
    q: 'What is NOT supported?',
    a: 'Apps requiring server-side logic, user authentication, payment processing, or database-driven dashboards. AICode2WP converts design and page structure — not application business logic.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
