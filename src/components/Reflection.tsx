import React, { useState } from 'react';
import type { Reflection as ReflectionType } from '../types';

interface ReflectionProps {
  reflection: ReflectionType;
  onSubmit: (response: string) => void;
}

export function Reflection({ reflection, onSubmit }: ReflectionProps) {
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleResponseChange = (value: string) => {
    setResponse(value);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleSubmit = () => {
    onSubmit(response);
    setIsSubmitted(true);
  };

  const handleRevise = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Reflection</h3>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-2">{reflection.prompt}</p>
        {reflection.context && (
          <p className="text-sm text-gray-500 mb-4">{reflection.context}</p>
        )}
      </div>

      <div className="mb-4">
        <textarea
          value={response}
          onChange={(e) => handleResponseChange(e.target.value)}
          disabled={isSubmitted}
          className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
          placeholder="Type your reflection here..."
        />
        
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>
            Words: {wordCount}
            {reflection.minWords && ` (minimum: ${reflection.minWords})`}
            {reflection.maxWords && ` (maximum: ${reflection.maxWords})`}
          </span>
          {reflection.keyTerms && (
            <span>
              Key terms to consider: {reflection.keyTerms.join(', ')}
            </span>
          )}
        </div>
      </div>

      {isSubmitted ? (
        <div className="flex justify-between items-center">
          <p className="text-green-600">
            Your reflection has been submitted successfully.
          </p>
          <button
            onClick={handleRevise}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Revise Response
          </button>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!response.trim() || 
            (reflection.minWords && wordCount < reflection.minWords) ||
            (reflection.maxWords && wordCount > reflection.maxWords)}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Reflection
        </button>
      )}
    </div>
  );
}