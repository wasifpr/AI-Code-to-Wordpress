const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Conversion',
    description: 'Claude AI analyzes your HTML/CSS/JS and converts it to properly structured WordPress PHP templates.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Get your WordPress theme ready in minutes, not days or weeks.',
  },
  {
    icon: '🔒',
    title: 'Secure Uploads',
    description: 'Your files are encrypted, processed securely, and automatically deleted after conversion.',
  },
  {
    icon: '🎨',
    title: 'Pixel-Perfect Output',
    description: 'Preserves your CSS structure, animations, and layout so your site looks exactly the same in WordPress.',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description: 'Your existing responsive CSS is preserved and carried over into the WordPress theme.',
  },
  {
    icon: '🛠️',
    title: 'Developer-Friendly Code',
    description: 'Clean, modular, and editable PHP, CSS, and JS files ready for advanced customization.',
  },
  {
    icon: '🗺️',
    title: 'Auto-Generated Menus',
    description: 'Automatically generates WordPress navigation menus and footer links from your site structure.',
  },
  {
    icon: '🔍',
    title: 'SEO Ready',
    description: 'Preserves site structure, headings, and meta-friendly markup for search engine indexing.',
  },
  {
    icon: '100%',
    title: 'You Own the Code',
    description: 'Download the theme, install it on your host. No lock-ins, no subscriptions required to run it.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to convert your AI-built site into a WordPress theme — instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
