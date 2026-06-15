'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const conversionId = searchParams.get('conversion');
  const [status, setStatus] = useState<'waiting' | 'converting' | 'done' | 'error'>('waiting');
  const [errorMsg, setErrorMsg] = useState('');
  const [themeName, setThemeName] = useState('');

  const triggerDownload = useCallback(async () => {
    if (!conversionId) return;
    setStatus('converting');

    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: conversionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Conversion failed');
      }

      setThemeName(data.themeName);

      // Trigger browser download from base64
      const byteChars = atob(data.zipBase64);
      const byteNums = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNums[i] = byteChars.charCodeAt(i);
      }
      const bytes = new Uint8Array(byteNums);
      const blob = new Blob([bytes], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.themeName}-wordpress-theme.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus('done');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }, [conversionId]);

  useEffect(() => {
    // Poll payment status then trigger download
    if (!conversionId) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/status?sessionId=${conversionId}`);
        const data = await res.json();
        if (data.paid) {
          triggerDownload();
        } else {
          // Retry after 2s (webhook may not have fired yet)
          setTimeout(poll, 2000);
        }
      } catch {
        setTimeout(poll, 2000);
      }
    };

    setTimeout(poll, 1500);
  }, [conversionId, triggerDownload]);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-32 pb-16 text-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
        {/* Waiting for webhook */}
        {status === 'waiting' && (
          <>
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming Payment...</h1>
            <p className="text-gray-600">Hang tight, we&apos;re verifying your payment.</p>
          </>
        )}

        {/* Converting */}
        {status === 'converting' && (
          <>
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Converting to WordPress...</h1>
            <p className="text-gray-600">Claude AI is generating your WordPress theme. This takes 1-3 minutes.</p>
            <div className="mt-6 space-y-2 text-left bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
              <p>✅ Payment confirmed</p>
              <p className="animate-pulse">⚙️ Generating PHP templates...</p>
            </div>
          </>
        )}

        {/* Done */}
        {status === 'done' && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Theme is Ready!</h1>
            <p className="text-gray-600 mb-2">
              <strong>{themeName}</strong> has been downloaded to your computer.
            </p>
            <p className="text-gray-500 text-sm mb-8">If the download didn&apos;t start, click the button below.</p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 text-left">
              <h3 className="font-semibold text-blue-900 mb-3">How to install your WordPress theme:</h3>
              <ol className="text-blue-800 text-sm space-y-2 list-decimal list-inside">
                <li>Log into your WordPress admin panel</li>
                <li>Go to <strong>Appearance → Themes → Add New → Upload Theme</strong></li>
                <li>Choose the <code className="bg-blue-100 px-1 rounded">.zip</code> file you just downloaded</li>
                <li>Click <strong>Install Now</strong> then <strong>Activate</strong></li>
                <li>Go to <strong>Appearance → Menus</strong> to set up navigation</li>
              </ol>
            </div>

            <button
              onClick={triggerDownload}
              className="block w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors mb-4"
            >
              Download Again
            </button>
            <Link href="/" className="text-gray-500 text-sm hover:text-gray-700">
              ← Back to Home
            </Link>
          </>
        )}

        {/* Error */}
        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Something Went Wrong</h1>
            <p className="text-red-600 mb-6">{errorMsg}</p>
            <p className="text-gray-600 mb-8 text-sm">
              Your payment was successful. Please email <strong>support@aicode2wp.com</strong> with your session ID:
              <br /><code className="bg-gray-100 px-2 py-1 rounded text-xs mt-2 inline-block">{conversionId}</code>
            </p>
            <button
              onClick={triggerDownload}
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={
        <div className="pt-32 text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
