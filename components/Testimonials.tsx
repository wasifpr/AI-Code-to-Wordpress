const testimonials = [
  {
    quote: 'AICode2WP took my Google AI Studio export and rebuilt it into a real WordPress theme in minutes. The code was clean and the layout stayed exactly the same.',
    name: 'Daniel K.',
    role: 'Freelance Developer',
  },
  {
    quote: 'Our team builds fast prototypes in Lovable and Cursor. This is the only tool we found that produces WordPress themes our developers are actually comfortable working with.',
    name: 'Jose M.',
    role: 'Founder, FastTrackWebsite',
  },
  {
    quote: 'Very convenient to easily convert a Google AI Studio design into a WordPress theme. Happy customer!',
    name: 'Frank',
    role: 'Founder, CreaThink',
  },
  {
    quote: 'I prefer using builders like Lovable but my clients still want WordPress. AICode2WP lets me deliver a real theme without touching PHP.',
    name: 'Imani R.',
    role: 'No-Code Creator',
  },
  {
    quote: 'Being able to preview the full conversion before paying made this a no-brainer. I knew exactly what I was getting.',
    name: 'Alex Chen',
    role: 'Freelance Web Developer',
  },
  {
    quote: 'We deliver many landing pages each month and AICode2WP has replaced our manual conversion process entirely.',
    name: 'Lucas',
    role: 'Director, Clearway Digital',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Builders</h2>
          <p className="text-xl text-gray-600">From solo developers to busy agencies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
