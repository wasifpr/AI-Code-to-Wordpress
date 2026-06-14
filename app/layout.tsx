import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AICode2WP - Convert AI Websites to WordPress Themes',
  description: 'Upload your AI-generated website and instantly get a fully functional, editable WordPress theme. Works with Lovable, v0.dev, Cursor, Bolt.new, and more.',
  keywords: ['wordpress theme', 'AI website converter', 'lovable to wordpress', 'v0.dev wordpress', 'AI to wordpress'],
  openGraph: {
    title: 'AICode2WP - Convert AI Websites to WordPress Themes',
    description: 'Convert your AI-built website into a WordPress theme in minutes.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
