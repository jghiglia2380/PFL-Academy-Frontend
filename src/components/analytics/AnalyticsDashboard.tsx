import React, { useState } from 'react';
import { ProtectedContent } from '../ProtectedContent';
import { EngagementMetrics } from './EngagementMetrics';
import { ProgressOverview } from './ProgressOverview';
import { PathwayComparison } from './PathwayComparison';
import { DataExport } from './DataExport';
import { ReportTemplates } from './ReportTemplates';
import { ReportScheduler } from './ReportScheduler';
import { AdvancedFilters } from './AdvancedFilters';
import { AnalyticsTutorial } from './AnalyticsTutorial';
import { NotificationCenter } from './NotificationCenter';
import { Filter, BarChart3, Users, Download, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLearningRecord } from '../../hooks/useLearningRecord';

export type FilterOptions = {
  timeRange: string;
  pathway: string | null;
  userGroup?: string;
  region?: string;
  gradeLevel?: string;
  startDate?: Date;
  endDate?: Date;
};

export function AnalyticsDashboard() {
  const { role } = useAuth();
  const { getPathwayAnalytics } = useLearningRecord();
  const [showTutorial, setShowTutorial] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    timeRange: '30',
    pathway: null
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleTemplateApply = (template: any) => {
    setFilters(template.filters);
    setShowTemplates(false);
  };

  return (
    <ProtectedContent requiredPermission="view_analytics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              {role === 'admin' 
                ? 'Platform-wide analytics and insights'
                : 'Classroom performance and engagement metrics'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            
            <button
              onClick={() => setShowTutorial(true)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Show tutorial"
            >
              <HelpCircle className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => setShowTemplates(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Templates
            </button>
            
            <button
              onClick={() => setShowAdvancedFilters(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Basic Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex space-x-4">
            <select
              value={filters.timeRange}
              onChange={(e) => handleFilterChange({ timeRange: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
              <option value="custom">Custom Range</option>
            </select>

            <select
              value={filters.pathway || 'all'}
              onChange={(e) => handleFilterChange({ 
                pathway: e.target.value === 'all' ? null : e.target.value 
              })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Pathways</option>
              <option value="synchronous">Synchronous</option>
              <option value="asynchronous">Asynchronous</option>
              <option value="blended">Blended</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {role === 'admin' ? 'Platform Engagement' : 'Class Engagement'}
              </h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <EngagementMetrics 
              timeRange={parseInt(filters.timeRange)}
              pathway={filters.pathway}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {role === 'admin' ? 'Overall Progress' : 'Student Progress'}
              </h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <ProgressOverview 
              timeRange={parseInt(filters.timeRange)}
              pathway={filters.pathway}
            />
          </div>
        </div>

        {/* Pathway Comparison */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Learning Pathway Comparison
            </h3>
          </div>
          <PathwayComparison 
            timeRange={parseInt(filters.timeRange)}
            pathway={filters.pathway}
          />
        </div>

        {/* Export and Scheduling */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <DataExport filters={filters} />
          {role === 'admin' && <ReportScheduler />}
        </div>

        {/* Modals */}
        {showAdvancedFilters && (
          <AdvancedFilters
            filters={filters}
            onApply={handleFilterChange}
            onClose={() => setShowAdvancedFilters(false)}
          />
        )}

        {showTemplates && (
          <ReportTemplates
            onApplyTemplate={handleTemplateApply}
          />
        )}

        {showTutorial && (
          <AnalyticsTutorial
            onClose={() => setShowTutorial(false)}
            role={role}
          />
        )}
      </div>
    </ProtectedContent>
  );
}