import React, { useState } from 'react';
import { Save, Template } from 'lucide-react';
import type { FilterOptions } from './AnalyticsDashboard';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  filters: FilterOptions;
  metrics: string[];
  format: 'pdf' | 'excel' | 'csv';
}

interface ReportTemplatesProps {
  onApplyTemplate: (template: ReportTemplate) => void;
}

export function ReportTemplates({ onApplyTemplate }: ReportTemplatesProps) {
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<ReportTemplate>>({});

  const handleSaveTemplate = () => {
    if (!newTemplate.name) return;

    const template: ReportTemplate = {
      id: crypto.randomUUID(),
      name: newTemplate.name,
      description: newTemplate.description || '',
      filters: newTemplate.filters || {},
      metrics: newTemplate.metrics || [],
      format: newTemplate.format || 'pdf'
    };

    setTemplates([...templates, template]);
    setIsCreating(false);
    setNewTemplate({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Report Templates</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Template className="h-4 w-4 mr-2" />
          Create Template
        </button>
      </div>

      <div className="space-y-4">
        {templates.map(template => (
          <div
            key={template.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
            <button
              onClick={() => onApplyTemplate(template)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Apply Template
            </button>
          </div>
        ))}
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h4 className="text-lg font-medium mb-4">Create Report Template</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={newTemplate.name || ''}
                  onChange={(e) => setNewTemplate({
                    ...newTemplate,
                    name: e.target.value
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTemplate.description || ''}
                  onChange={(e) => setNewTemplate({
                    ...newTemplate,
                    description: e.target.value
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              {/* Add more template configuration options */}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}