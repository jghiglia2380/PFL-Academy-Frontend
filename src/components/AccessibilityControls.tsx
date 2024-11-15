import React from 'react';
import { Type, Sun, Monitor, Eye } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

export function AccessibilityControls() {
  const { settings, updateSettings } = useAccessibility();

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg" role="region" aria-label="Accessibility Controls">
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <Type className="h-5 w-5" />
            <span>Font Size</span>
          </label>
          <select
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            aria-label="Select font size"
          >
            <option value="normal">Normal</option>
            <option value="large">Large</option>
            <option value="x-large">Extra Large</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <span>Contrast</span>
          </label>
          <button
            onClick={() => updateSettings({ contrast: settings.contrast === 'normal' ? 'high' : 'normal' })}
            className={`mt-1 px-4 py-2 rounded-md w-full ${
              settings.contrast === 'high'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            aria-pressed={settings.contrast === 'high'}
          >
            {settings.contrast === 'high' ? 'High Contrast' : 'Normal Contrast'}
          </button>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <Monitor className="h-5 w-5" />
            <span>Motion</span>
          </label>
          <button
            onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
            className={`mt-1 px-4 py-2 rounded-md w-full ${
              settings.reducedMotion
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            aria-pressed={settings.reducedMotion}
          >
            {settings.reducedMotion ? 'Reduced Motion' : 'Normal Motion'}
          </button>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Screen Reader</span>
          </label>
          <button
            onClick={() => updateSettings({ screenReader: !settings.screenReader })}
            className={`mt-1 px-4 py-2 rounded-md w-full ${
              settings.screenReader
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            aria-pressed={settings.screenReader}
          >
            {settings.screenReader ? 'Screen Reader Mode On' : 'Screen Reader Mode Off'}
          </button>
        </div>
      </div>
    </div>
  );
}