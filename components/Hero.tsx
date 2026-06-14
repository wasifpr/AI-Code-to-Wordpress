import Link from 'next/link';

const platforms = [
  'Lovable', 'v0.dev', 'Cursor', 'Bolt.new', 'Replit',
  'Google AI Studio', 'Claude', 'Framer', 'Base44',
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-primary-700 text-sm font-medium">AI-Powered WordPress Conversion</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
          Convert Your AI Site to
          <span className="text-primary-600"> WordPress</span>
          <br />in One Click
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload your AI-generated website and get a fully functional, editable WordPress theme — instantly.
          No manual coding. No rebuilding from scratch.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/convert"
            className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 hover:shadow-xl hover:scale-105"
          >
            Generate Free Preview
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto text-gray-700 border border-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all">
            See How It Works
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-2xl font-bold text-gray-900">5,000+</span>
            <span className="text-sm">sites converted</span>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 text-sm ml-1">4.9/5 rating</span>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="text-gray-600 text-sm">⚡ Under 5 minutes</div>
        </div>

        {/* Platforms */}
        <div>
          <p className="text-sm text-gray-500 mb-4">Works with all major AI builders and code exports</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {platforms.map(p => (
              <span key={p} className="bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-lg shadow-sm font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
