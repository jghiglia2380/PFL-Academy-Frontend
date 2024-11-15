import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import type { Chapter } from '../types';
import { useLearningRecord } from '../hooks/useLearningRecord';

interface ChapterListProps {
  chapters: Chapter[];
  currentChapterId: string;
  onSelectChapter: (chapter: Chapter) => void;
}

export function ChapterList({ chapters, currentChapterId, onSelectChapter }: ChapterListProps) {
  const { getPathwayAnalytics } = useLearningRecord();
  const analytics = getPathwayAnalytics('asynchronous');

  return (
    <nav className="space-y-2" aria-label="Chapters">
      {chapters.map((chapter) => {
        const isComplete = analytics?.completedActivities > 0;
        const isCurrent = chapter.id === currentChapterId;

        return (
          <button
            key={chapter.id}
            onClick={() => onSelectChapter(chapter)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isCurrent
                ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="mr-3">
              {isComplete ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </span>
            <span className="text-left">{chapter.title}</span>
          </button>
        );
      })}
    </nav>
  );
}