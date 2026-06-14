'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">WP</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">AICode2WP</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">How It Works</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</Link>
            <Link href="#faq" className="text-gray-600 hover:text-gray-900 text-sm font-medium">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link href="/convert" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
              Start Converting
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-gray-900">How It Works</Link>
            <Link href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/convert" className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center mt-2">
              Start Converting
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
