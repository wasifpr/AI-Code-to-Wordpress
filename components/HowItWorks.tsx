const steps = [
  {
    number: '1',
    title: 'Upload Exported Site',
    description: 'Drop your .zip file containing HTML, CSS, JS, and assets from any AI builder or custom code.',
    icon: '📦',
  },
  {
    number: '2',
    title: 'AI Analyzes & Converts',
    description: 'Our AI engine analyzes your code structure and converts each page to a WordPress PHP template.',
    icon: '🤖',
  },
  {
    number: '3',
    title: 'Preview & Download',
    description: 'Preview the conversion for free. Unlock the full .zip download to get your installable WordPress theme.',
    icon: '⬇️',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your exported website into a WordPress theme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary-200 z-0" style={{ width: 'calc(100% - 6rem)', left: 'calc(50% + 3rem)' }} />
              )}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center relative z-10">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
