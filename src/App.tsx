import React, { useState } from 'react';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { StandardView } from './components/StandardView';
import { standards } from './data/standards';

export default function App() {
  const [selectedStandardId, setSelectedStandardId] = useState<string | null>(null);

  const selectedStandard = selectedStandardId 
    ? standards.find(s => s.id === selectedStandardId)
    : null;

  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar onLogoClick={() => setSelectedStandardId(null)} />
        
        <main id="main-content" className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {selectedStandard ? (
            <StandardView standard={selectedStandard} />
          ) : (
            <LandingPage onSelectStandard={setSelectedStandardId} />
          )}
        </main>
      </div>
    </AccessibilityProvider>
  );
}