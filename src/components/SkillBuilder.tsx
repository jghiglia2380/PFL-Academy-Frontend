import React, { useState } from 'react';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import type { SkillBuilder as SkillBuilderType } from '../types';

interface SkillBuilderProps {
  skillBuilder: SkillBuilderType;
  onComplete: (result: { completed: boolean; score?: number }) => void;
}

export function SkillBuilder({ skillBuilder, onComplete }: SkillBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleResponseChange = (stepId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [stepId]: value
    }));
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete({ completed: true });
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Skill Builder Completed!
          </h3>
          <p className="text-gray-600 mb-6">
            Great job completing this skill-building activity.
          </p>
          <button
            onClick={() => {
              setIsCompleted(false);
              setCurrentStep(0);
              setResponses({});
            }}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center mb-6">
        <BookOpen className="h-6 w-6 text-indigo-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">
          {skillBuilder.title}
        </h3>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">{skillBuilder.description}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Activity</h4>
        <div className="prose max-w-none">
          {skillBuilder.activity}
        </div>
      </div>

      {skillBuilder.steps && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Step {currentStep + 1} of {skillBuilder.steps.length}
            </h4>
            <span className="text-sm text-gray-500">
              Progress: {Math.round(((currentStep + 1) / skillBuilder.steps.length) * 100)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / skillBuilder.steps.length) * 100}%` }}
            />
          </div>

          <div className="space-y-4">
            <p className="text-gray-800">{skillBuilder.steps[currentStep].instruction}</p>
            <textarea
              value={responses[skillBuilder.steps[currentStep].id] || ''}
              onChange={(e) => handleResponseChange(skillBuilder.steps[currentStep].id, e.target.value)}
              className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your response here..."
            />
          </div>
        </div>
      )}

      {skillBuilder.resources && skillBuilder.resources.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
          <ul className="list-disc pl-5 space-y-1">
            {skillBuilder.resources.map((resource, index) => (
              <li key={index} className="text-gray-600">
                {resource}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end">
        {skillBuilder.steps ? (
          currentStep < skillBuilder.steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!responses[skillBuilder.steps[currentStep].id]}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed inline-flex items-center"
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!responses[skillBuilder.steps[currentStep].id]}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Complete Activity
            </button>
          )
        ) : (
          <button
            onClick={handleComplete}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Complete Activity
          </button>
        )}
      </div>
    </div>
  );
}