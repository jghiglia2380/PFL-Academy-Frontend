import React, { useState } from 'react';
import { BookOpen, Settings } from 'lucide-react';
import { AccessibilityControls } from './AccessibilityControls';

interface NavbarProps {
  onLogoClick: () => void;
}

export function Navbar({ onLogoClick }: NavbarProps) {
  const [showAccessibility, setShowAccessibility] = useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            className="flex items-center cursor-pointer"
            onClick={onLogoClick}
          >
            <BookOpen className="h-8 w-8 text-white" />
            <span className="ml-3 text-white text-lg font-medium">
              PFL Academy
            </span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowAccessibility(!showAccessibility)}
              className="p-2 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Accessibility settings"
            >
              <Settings className="h-6 w-6" />
            </button>

            {showAccessibility && (
              <div className="absolute right-0 mt-2 w-72 z-50">
                <AccessibilityControls />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}