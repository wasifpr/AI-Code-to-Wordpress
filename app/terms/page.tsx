import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Last updated: June 2026</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Service Description</h2>
          <p className="text-gray-600 mb-4">AICode2WP converts HTML/CSS/JS websites into WordPress PHP theme files using AI. You own all output code generated from your input.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Acceptable Use</h2>
          <p className="text-gray-600 mb-4">You may only upload files you own or have rights to convert. You may not use this service for illegal purposes or to infringe third-party IP.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Payments</h2>
          <p className="text-gray-600 mb-4">All payments are processed by Stripe. Starter plan is a one-time purchase. Pro and Agency are monthly subscriptions billed automatically. Cancel anytime from your account.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Refunds</h2>
          <p className="text-gray-600 mb-4">Refunds are available within 7 days of purchase if the conversion output is materially broken. Contact support@aicode2wp.com with your order ID.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Limitation of Liability</h2>
          <p className="text-gray-600 mb-4">AICode2WP is provided as-is. We are not liable for conversion quality beyond offering a refund. Always review converted themes before deploying to production.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact</h2>
          <p className="text-gray-600">Questions? Email support@aicode2wp.com</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
