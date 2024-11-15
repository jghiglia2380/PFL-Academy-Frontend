import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

interface ProgressTrackerProps {
  standardId: string;
  chapterId: string;
}

export function ProgressTracker({ standardId, chapterId }: ProgressTrackerProps) {
  const { progress, loading } = useProgress(standardId);

  if (loading) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-2">Your Progress</h4>
      <div className="flex items-center">
        <div className="flex-grow">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="ml-2 text-sm text-gray-600">
          {progress}%
        </span>
      </div>
    </div>
  );
}