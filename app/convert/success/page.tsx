import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-32 pb-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Your WordPress theme is being generated. You will receive your download shortly.
            Check your email for the download link.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
              <li>Download your WordPress theme .zip</li>
              <li>Log into your WordPress admin panel</li>
              <li>Go to Appearance &rarr; Themes &rarr; Add New &rarr; Upload Theme</li>
              <li>Upload the .zip file and activate the theme</li>
            </ol>
          </div>
          <Link href="/" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
