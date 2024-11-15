import React, { useState } from 'react';

interface FeedbackData {
  type: 'accessibility' | 'usability' | 'content' | 'other';
  message: string;
  page: string;
}

export function FeedbackCollector() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: 'accessibility',
    message: '',
    page: window.location.pathname
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit feedback to server
    console.log('Feedback submitted:', feedback);
    setIsOpen(false);
    setFeedback({ ...feedback, message: '' });
  };

  return (
    <div className="fixed bottom-4 left-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
        aria-label="Open feedback form"
      >
        Provide Feedback
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          role="dialog"
          aria-label="Feedback form"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Share Your Feedback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Feedback Type
                </label>
                <select
                  value={feedback.type}
                  onChange={(e) => setFeedback({ ...feedback, type: e.target.value as any })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="accessibility">Accessibility</option>
                  <option value="usability">Usability</option>
                  <option value="content">Content</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Feedback
                </label>
                <textarea
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={4}
                  required
                  placeholder="Please share your thoughts..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}