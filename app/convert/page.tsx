'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const PLATFORMS = [
  'Lovable', 'v0.dev', 'Cursor', 'Bolt.new', 'Replit',
  'Google AI Studio', 'Claude', 'Framer', 'Base44', 'Next.js', 'Other',
];

interface PreviewFile {
  name: string;
  type: string;
  size: number;
  path: string;
}

interface Preview {
  themeName: string;
  detectedPlatform: string;
  files: PreviewFile[];
  htmlFiles: string[];
  cssFiles: string[];
  jsFiles: string[];
  imageFiles: string[];
  totalSize: number;
}

type Stage = 'upload' | 'processing' | 'preview' | 'checkout';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ConvertPage() {
  const [stage, setStage] = useState<Stage>('upload');
  const [platform, setPlatform] = useState('');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'agency'>('starter');
  const [checkingOut, setCheckingOut] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    if (!file.name.endsWith('.zip')) {
      setError('Please upload a .zip file.');
      return;
    }

    setError('');
    setStage('processing');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('platform', platform);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setPreview(data.preview);
      setSessionId(data.sessionId);
      setStage('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setStage('upload');
    }
  }, [platform]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/zip': ['.zip'] },
    maxFiles: 1,
    disabled: stage === 'processing',
  });

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, plan: selectedPlan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Convert Your Site to WordPress</h1>
          <p className="text-gray-600 text-lg">Upload your exported .zip file and get a free preview instantly.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Upload Stage */}
        {stage === 'upload' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform (optional)</label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select platform...</option>
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-5xl mb-4">{isDragActive ? '📥' : '📦'}</div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {isDragActive ? 'Drop your .zip file here' : 'Drag & drop your .zip file here'}
              </p>
              <p className="text-gray-500 mb-4">or click to browse files</p>
              <p className="text-sm text-gray-400">Supports .zip exports from any AI builder &bull; Max 50MB</p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span>🔒 Secure upload</span>
              <span>⚡ Preview instantly</span>
              <span>✨ AI-powered</span>
            </div>
          </div>
        )}

        {/* Processing Stage */}
        {stage === 'processing' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Site...</h2>
            <p className="text-gray-600">AI is scanning your code structure and preparing the preview.</p>
          </div>
        )}

        {/* Preview Stage */}
        {stage === 'preview' && preview && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{preview.themeName}</h2>
                  <p className="text-gray-500 text-sm mt-1">Detected from: {preview.detectedPlatform}</p>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
                  Ready to convert
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[['HTML Pages', preview.htmlFiles.length],['CSS Files', preview.cssFiles.length],['JS Files', preview.jsFiles.length],['Images', preview.imageFiles.length]].map(([label, count]) => (
                  <div key={label as string} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-gray-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* File list */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Files in Your Theme ({preview.files.length} total)</h3>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {preview.files.slice(0, 30).map((f, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="text-base">
                        {f.type === 'php' ? '📘' : f.type === 'css' ? '🎨' : f.type === 'js' ? '⚡' : f.type === 'image' ? '🖼️' : '📄'}
                      </span>
                      <span className="text-sm text-gray-700 font-mono">{f.path}</span>
                    </div>
                    <span className="text-xs text-gray-400">{formatBytes(f.size)}</span>
                  </div>
                ))}
                {preview.files.length > 30 && (
                  <p className="text-center text-gray-500 text-sm py-2">+{preview.files.length - 30} more files...</p>
                )}
              </div>
            </div>

            {/* What you get */}
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">What You\'ll Get After Unlocking</h3>
              <ul className="space-y-2">
                {['index.php, header.php, footer.php, page.php templates','functions.php with full WordPress setup','style.css with theme header','All your CSS, JS, and images preserved','Auto-generated navigation menus','Ready-to-install .zip file'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Plan selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Choose Your Plan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[{key:'starter' as const,name:'Starter',price:'$19',desc:'One-time unlock'},{key:'pro' as const,name:'Pro',price:'$49/mo',desc:'20 conversions/month'},{key:'agency' as const,name:'Agency',price:'$249/mo',desc:'Unlimited conversions'}].map(plan => (
                  <button
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedPlan === plan.key
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-gray-900">{plan.name}</div>
                    <div className="text-primary-600 font-semibold">{plan.price}</div>
                    <div className="text-gray-500 text-xs mt-1">{plan.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkingOut ? 'Redirecting to payment...' : 'Unlock & Download WordPress Theme'}
              </button>
              <p className="text-center text-gray-500 text-xs mt-3">🔒 Secure payment via Stripe &bull; Instant download</p>
            </div>

            <button
              onClick={() => { setStage('upload'); setPreview(null); }}
              className="w-full text-gray-500 text-sm hover:text-gray-700 py-2"
            >
              ← Upload a different file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
