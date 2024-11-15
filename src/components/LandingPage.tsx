import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { standards } from '../data/standards';

interface LandingPageProps {
  onSelectStandard: (standardId: string) => void;
}

export function LandingPage({ onSelectStandard }: LandingPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Financial Education"
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            PFL Academy
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Empowering students with essential financial literacy skills through comprehensive education.
          </p>
        </div>
      </div>

      {/* Standards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Financial Literacy Standards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((standard) => (
            <button
              key={standard.id}
              onClick={() => onSelectStandard(standard.id)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{standard.title}</h3>
                  <p className="text-gray-600 mb-4">{standard.overview}</p>
                  <div className="flex items-center text-indigo-600">
                    <span className="text-sm font-medium">
                      {standard.chapters.length} chapters
                    </span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}