import React, { useState } from 'react';
import { FilterOptions } from './AnalyticsDashboard';
import { X } from 'lucide-react';

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onApply: (filters: Partial<FilterOptions>) => void;
  onClose: () => void;
}

export function AdvancedFilters({ filters, onApply, onClose }: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Advanced Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Date Range */}
          {localFilters.timeRange === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={localFilters.startDate?.toISOString().split('T')[0]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    startDate: new Date(e.target.value)
                  })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="date"
                  value={localFilters.endDate?.toISOString().split('T')[0]}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    endDate: new Date(e.target.value)
                  })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* User Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Group
            </label>
            <select
              value={localFilters.userGroup}
              onChange={(e) => setLocalFilters({
                ...localFilters,
                userGroup: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Groups</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              value={localFilters.region}
              onChange={(e) => setLocalFilters({
                ...localFilters,
                region: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Regions</option>
              <option value="northeast">Northeast</option>
              <option value="southeast">Southeast</option>
              <option value="midwest">Midwest</option>
              <option value="southwest">Southwest</option>
              <option value="west">West</option>
            </select>
          </div>

          {/* Grade Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade Level
            </label>
            <select
              value={localFilters.gradeLevel}
              onChange={(e) => setLocalFilters({
                ...localFilters,
                gradeLevel: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Grades</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}