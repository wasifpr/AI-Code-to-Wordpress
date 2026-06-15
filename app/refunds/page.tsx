import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        <div className="space-y-6 text-gray-600">
          <p className="text-gray-500">Last updated: June 2026</p>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Commitment</h2>
            <p>We want you to be happy with your WordPress theme conversion. If something is broken or materially wrong with your output, we will make it right.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Eligibility for Refund</h2>
            <p className="mb-3">You are eligible for a full refund within <strong>7 days of purchase</strong> if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The converted WordPress theme fails to install correctly</li>
              <li>The output is completely blank or missing your content</li>
              <li>There is a technical error on our end preventing delivery</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Not Eligible for Refund</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Minor styling differences between your original site and the WordPress output</li>
              <li>App logic that does not transfer (calculators, dashboards, login systems)</li>
              <li>Requests made after 7 days</li>
              <li>Subscriptions after the first billing cycle</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">How to Request</h2>
            <p>Email <strong>support@aicode2wp.com</strong> with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your order/session ID</li>
              <li>A description of the issue</li>
              <li>Screenshots if possible</li>
            </ul>
            <p className="mt-3">We respond within 24 hours on business days.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Subscriptions</h2>
            <p>You may cancel your Pro or Agency subscription at any time. You will retain access until the end of your current billing period. No partial refunds for unused time.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
