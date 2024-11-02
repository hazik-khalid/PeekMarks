import { useState } from 'react';

export default function App() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const features = [
    { id: 1, title: 'Quick Bookmarking', description: 'Easily save your favorite websites with a single click.', icon: 'fas fa-bookmark' },
    { id: 2, title: 'Visual Previews', description: 'Get a glimpse of your bookmarked pages with visual previews.', icon: 'fas fa-image' },
    { id: 3, title: 'Light/Dark Mode', description: 'Switch between light and dark modes to suit your mood.', icon: 'fas fa-adjust' },
    { id: 4, title: 'Multi-Browser Compatibility', description: 'Use Bookmark Manager across Chrome and Firefox.', icon: 'fas fa-globe' },
  ];

  const faqs = [
    { id: 1, question: 'Is Bookmark Manager compatible with my browser?', answer: 'Yes, Bookmark Manager is compatible with Chrome and Firefox.' },
    { id: 2, question: 'How do I set up Bookmark Manager?', answer: 'Simply download and install the extension, then follow the prompts to set up.' },
    { id: 3, question: 'How do I update Bookmark Manager?', answer: 'Updates are automatic, but you can also check for updates in your browser\'s extension settings.' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <section className="hero mb-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Bookmark Manager</h1>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">Effortlessly manage your bookmarks across Chrome and Firefox.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Download for Chrome
            </button>
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition duration-300">
              Download for Firefox
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center">
                  <i className={`${feature.icon} text-4xl mb-4 text-blue-500`}></i>
                  <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        <section className="demo mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Demo</h2>
          <div className="flex justify-center">
            <img src="https://via.placeholder.com/800x600" alt="Demo screenshot" className="w-full md:w-3/4 lg:w-1/2 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300" />
          </div>
        </section>

        {/* FAQs Section */}
        <section className="faqs mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <button
                  className="w-full text-left text-lg font-semibold text-blue-500"
                  onClick={() => setActiveQuestion(faq.id === activeQuestion ? null : faq.id)}
                >
                  {faq.question}
                </button>
                {faq.id === activeQuestion && (
                  <p className="mt-2 text-gray-700 dark:text-gray-400">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 mt-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p>&copy; 2023 Bookmark Manager. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Contact</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Twitter</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">GitHub</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
