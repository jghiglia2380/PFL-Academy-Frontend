import React, { useState } from 'react';
import type { Standard } from '../types';
import { ChapterList } from './ChapterList';
import { ChapterContent } from './ChapterContent';
import { ChapterNavigation } from './ChapterNavigation';
import { ProgressTracker } from './ProgressTracker';

interface StandardViewProps {
  standard: Standard;
}

export function StandardView({ standard }: StandardViewProps) {
  const [selectedChapter, setSelectedChapter] = useState(standard.chapters[0]);
  const [pathway] = useState<'synchronous' | 'asynchronous' | 'blended'>('asynchronous');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{standard.title}</h2>
            <p className="text-gray-600 mb-6">{standard.overview}</p>
            <ChapterList
              chapters={standard.chapters}
              currentChapterId={selectedChapter.id}
              onSelectChapter={setSelectedChapter}
            />
            <ProgressTracker
              standardId={standard.id}
              chapterId={selectedChapter.id}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm">
            <ChapterContent
              chapter={selectedChapter}
              pathway={pathway}
            />
            
            <div className="px-8 pb-8">
              <ChapterNavigation
                standard={standard}
                currentChapter={selectedChapter}
                onNavigate={setSelectedChapter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}