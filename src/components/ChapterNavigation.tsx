import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Standard, Chapter } from '../types';

interface ChapterNavigationProps {
  standard: Standard;
  currentChapter: Chapter;
  onNavigate: (chapter: Chapter) => void;
}

export function ChapterNavigation({ standard, currentChapter, onNavigate }: ChapterNavigationProps) {
  const currentIndex = standard.chapters.findIndex(ch => ch.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? standard.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < standard.chapters.length - 1 ? standard.chapters[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center mt-8 border-t border-gray-200 pt-6">
      {prevChapter ? (
        <button
          onClick={() => onNavigate(prevChapter)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Previous: {prevChapter.title}</span>
        </button>
      ) : (
        <div /> // Empty div for spacing
      )}

      {nextChapter && (
        <button
          onClick={() => onNavigate(nextChapter)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <span>Next: {nextChapter.title}</span>
          <ChevronRight className="h-5 w-5 ml-1" />
        </button>
      )}
    </div>
  );
}