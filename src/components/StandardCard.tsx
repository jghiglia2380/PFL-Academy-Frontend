import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { Standard } from '../types';

interface StandardCardProps {
  standard: Standard;
  onClick: () => void;
}

export function StandardCard({ standard, onClick }: StandardCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{standard.title}</h3>
          <p className="text-gray-600">{standard.overview}</p>
          <p className="text-sm text-indigo-600 mt-2">{standard.chapters.length} chapters</p>
        </div>
        <ChevronRight className="h-6 w-6 text-gray-400" />
      </div>
    </div>
  );
}