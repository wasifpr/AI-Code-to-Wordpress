import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Last updated: June 2026</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Data We Collect</h2>
          <p className="text-gray-600 mb-4">When you use AICode2WP, we collect:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Uploaded .zip files (processed in memory, deleted after conversion)</li>
            <li>Payment information (handled by Stripe — we never see your card details)</li>
            <li>Email address (if you create an account)</li>
            <li>Conversion metadata (file counts, theme name, platform)</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How We Use Your Data</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>To process your WordPress theme conversion</li>
            <li>To deliver your download after payment</li>
            <li>To improve our AI conversion quality</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Your Code is Private</h2>
          <p className="text-gray-600 mb-4">Your uploaded source code is never stored permanently, shared with third parties, or used to train AI models. Files are processed in memory and discarded immediately after conversion.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact</h2>
          <p className="text-gray-600">For privacy questions, email us at privacy@aicode2wp.com</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
