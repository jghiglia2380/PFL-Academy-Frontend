import React, { useState } from 'react';
import { Download } from 'lucide-react';

export function DataExport() {
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Implement export logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate file download
      const element = document.createElement('a');
      element.href = URL.createObjectURL(new Blob(['Sample data'], { type: 'text/plain' }));
      element.download = `analytics_export.${exportFormat}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Export Data</h3>
        <Download className="h-5 w-5 text-gray-400" />
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="csv">CSV</option>
          <option value="xlsx">Excel</option>
          <option value="json">JSON</option>
        </select>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {isExporting ? 'Exporting...' : 'Export Data'}
        </button>
      </div>
    </div>
  );
}