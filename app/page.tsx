import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />

      {/* CTA section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to convert your site?
          </h2>
          <p className="text-primary-100 text-xl mb-8">
            Preview is free. Pay only when you want to download.
          </p>
          <Link
            href="/convert"
            className="inline-block bg-white text-primary-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-primary-50 transition-all shadow-lg hover:scale-105"
          >
            Generate Free Preview
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
