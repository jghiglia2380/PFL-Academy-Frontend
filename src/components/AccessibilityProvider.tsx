import React, { createContext, useContext, useState } from 'react';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'x-large';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
  screenReader: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    contrast: 'normal',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    screenReader: false,
  });

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      <div className={`
        ${settings.fontSize === 'large' ? 'text-lg' : ''}
        ${settings.fontSize === 'x-large' ? 'text-xl' : ''}
        ${settings.contrast === 'high' ? 'high-contrast' : ''}
        ${settings.reducedMotion ? 'reduce-motion' : ''}
        ${settings.screenReader ? 'screen-reader-mode' : ''}
      `}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}