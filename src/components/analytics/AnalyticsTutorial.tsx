import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { UserRole } from '../../types/roles';

interface AnalyticsTutorialProps {
  onClose: () => void;
  role: UserRole;
}

export function AnalyticsTutorial({ onClose, role }: AnalyticsTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Analytics',
      content: role === 'admin'
        ? 'This dashboard provides comprehensive platform-wide analytics and insights.'
        : 'This dashboard helps you track student performance and engagement.',
      image: '/tutorial/analytics-overview.png'
    },
    {
      title: 'Filtering Data',
      content: 'Use the advanced filters to segment data by time period, user groups, regions, and more.',
      image: '/tutorial/filters.png'
    },
    {
      title: 'Engagement Metrics',
      content: 'Track user engagement through interactive charts showing participation and activity trends.',
      image: '/tutorial/engagement.png'
    },
    {
      title: 'Progress Tracking',
      content: 'Monitor completion rates and performance across different learning pathways.',
      image: '/tutorial/progress.png'
    },
    {
      title: 'Exporting Data',
      content: 'Export analytics in various formats for further analysis or reporting.',
      image: '/tutorial/export.png'
    }
  ];

  if (role === 'admin') {
    steps.push({
      title: 'Scheduled Reports',
      content: 'Set up automated reports to be delivered to stakeholders on a regular basis.',
      image: '/tutorial/scheduling.png'
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Analytics Tutorial</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-8">
          <div className="aspect-video bg-gray-100 rounded-lg mb-4">
            {/* Placeholder for tutorial images */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {steps[currentStep].image}
            </div>
          </div>

          <h4 className="text-lg font-medium mb-2">
            {steps[currentStep].title}
          </h4>
          <p className="text-gray-600">
            {steps[currentStep].content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:text-gray-400"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full ${
                  currentStep === index
                    ? 'bg-indigo-600'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}