import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface KnowledgeCheckProps {
  check: {
    question: string;
    options: { id: string; text: string }[];
    correctId: string;
    explanation: string;
  };
  onComplete: (score: number) => void;
}

export function KnowledgeCheck({ check, onComplete }: KnowledgeCheckProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    if (!selectedId) return;
    setShowFeedback(true);
    onComplete(selectedId === check.correctId ? 100 : 0);
  };

  const isCorrect = selectedId === check.correctId;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Quick Check</h3>
      
      <p className="text-gray-800 mb-4">{check.question}</p>

      <div className="space-y-3 mb-4">
        {check.options.map((option) => (
          <button
            key={option.id}
            onClick={() => !showFeedback && setSelectedId(option.id)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
              selectedId === option.id
                ? showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {showFeedback ? (
        <div className={`p-4 rounded-lg mb-4 ${
          isCorrect ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <div className="flex items-center mb-2">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
            )}
            <span className={isCorrect ? 'text-green-800' : 'text-red-800'}>
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </span>
          </div>
          <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
            {check.explanation}
          </p>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}