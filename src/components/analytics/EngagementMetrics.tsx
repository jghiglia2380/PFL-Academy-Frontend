import React from 'react';
import { useLearningRecord } from '../../hooks/useLearningRecord';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EngagementMetricsProps {
  timeRange: number;
}

export function EngagementMetrics({ timeRange }: EngagementMetricsProps) {
  const { getPathwayAnalytics } = useLearningRecord();
  
  // Get analytics for all pathways
  const synchronousAnalytics = getPathwayAnalytics('synchronous');
  const asynchronousAnalytics = getPathwayAnalytics('asynchronous');
  const blendedAnalytics = getPathwayAnalytics('blended');

  const totalInteractions = (
    (synchronousAnalytics?.totalInteractions || 0) +
    (asynchronousAnalytics?.totalInteractions || 0) +
    (blendedAnalytics?.totalInteractions || 0)
  );

  const averageScore = (
    ((synchronousAnalytics?.averageScore || 0) +
    (asynchronousAnalytics?.averageScore || 0) +
    (blendedAnalytics?.averageScore || 0)) / 3
  );

  // Sample data - replace with actual data from your analytics service
  const engagementData = Array.from({ length: timeRange }, (_, i) => ({
    date: new Date(Date.now() - (timeRange - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    interactions: Math.floor(totalInteractions / timeRange * (1 + Math.random() * 0.5)),
    score: Math.floor(averageScore * (0.9 + Math.random() * 0.2))
  }));

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Interactions</p>
          <p className="text-2xl font-bold text-gray-900">{totalInteractions}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-bold text-gray-900">{Math.round(averageScore)}%</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval={Math.floor(timeRange / 5)}
            />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="interactions" 
              stroke="#4F46E5" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#059669" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}