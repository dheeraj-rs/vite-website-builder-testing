import { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';

type AIBuilderProps = {
  onGenerate: (html: string, css: string) => void;
  onBack: () => void;
};

export default function AIBuilder({ onGenerate, onBack }: AIBuilderProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const generateWebsite = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    const userMessage = { role: 'user' as const, content: prompt };
    setMessages(prev => [...prev, userMessage]);

    try {
      const API_KEY = 'AIzaSyAhJB5h3btdONhVYXcjvalk5ePTBm9JBgsM';
      const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional web designer. Create a complete, production-ready HTML and CSS code for a website based on this description: "${prompt}".

              Requirements:
              - Generate ONLY HTML and CSS code, no JavaScript
              - HTML should be complete and semantic
              - CSS should be modern, responsive, and beautiful
              - Use inline styles or a <style> tag in the HTML
              - Make it visually impressive with modern design trends
              - Include proper spacing, colors, and typography
              - Make it mobile-responsive

              Format your response EXACTLY like this:
              HTML:
              [html code here]

              CSS:
              [css code here]`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate website');
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      setMessages(prev => [...prev, { role: 'assistant', content: 'Website generated successfully!' }]);

      const htmlMatch = generatedText.match(/HTML:\s*([\s\S]*?)(?=CSS:|$)/i);
      const cssMatch = generatedText.match(/CSS:\s*([\s\S]*?)$/i);

      let html = htmlMatch ? htmlMatch[1].trim() : '';
      let css = cssMatch ? cssMatch[1].trim() : '';

      html = html.replace(/```html|```/g, '').trim();
      css = css.replace(/```css|```/g, '').trim();

      if (!html) {
        html = generatedText;
        css = '';
      }

      onGenerate(html, css);
      setPrompt('');
    } catch (err) {
      setError('Failed to generate website. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateWebsite();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        ← Back to Templates
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AI Website Builder</h1>
          </div>
          <p className="text-blue-100">Describe your dream website and watch it come to life</p>
        </div>

        <div className="p-8">
          {messages.length > 0 && (
            <div className="mb-6 space-y-4 max-h-64 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-50 text-gray-900 ml-8'
                      : 'bg-gray-50 text-gray-900 mr-8'
                  }`}
                >
                  <div className="font-semibold mb-1">
                    {message.role === 'user' ? 'You' : 'AI'}
                  </div>
                  <div>{message.content}</div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your website
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Create a modern landing page for a coffee shop with a hero section, menu, and contact form..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={generateWebsite}
              disabled={loading || !prompt.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Generate Website
                </>
              )}
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Tips for better results:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Be specific about the type of website (e.g., portfolio, restaurant, SaaS)</li>
              <li>• Mention desired sections (hero, features, pricing, contact)</li>
              <li>• Specify color preferences or design style</li>
              <li>• Include any special requirements or features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
