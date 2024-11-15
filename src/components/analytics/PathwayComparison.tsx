import React from 'react';
import { useLearningRecord } from '../../hooks/useLearningRecord';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PathwayComparisonProps {
  timeRange: number;
  pathway: string | null;
}

export function PathwayComparison({ timeRange, pathway }: PathwayComparisonProps) {
  const { getPathwayAnalytics } = useLearningRecord();

  const pathwayData = {
    synchronous: getPathwayAnalytics('synchronous'),
    asynchronous: getPathwayAnalytics('asynchronous'),
    blended: getPathwayAnalytics('blended')
  };

  const metrics = [
    {
      name: 'Average Score',
      synchronous: pathwayData.synchronous?.averageScore || 0,
      asynchronous: pathwayData.asynchronous?.averageScore || 0,
      blended: pathwayData.blended?.averageScore || 0
    },
    {
      name: 'Completion Rate',
      synchronous: (pathwayData.synchronous?.completedActivities || 0) * 100 / (pathwayData.synchronous?.totalInteractions || 1),
      asynchronous: (pathwayData.asynchronous?.completedActivities || 0) * 100 / (pathwayData.asynchronous?.totalInteractions || 1),
      blended: (pathwayData.blended?.completedActivities || 0) * 100 / (pathwayData.blended?.totalInteractions || 1)
    },
    {
      name: 'Engagement Score',
      synchronous: Math.random() * 100, // Replace with actual engagement metrics
      asynchronous: Math.random() * 100,
      blended: Math.random() * 100
    }
  ];

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {(!pathway || pathway === 'all' || pathway === 'synchronous') && (
            <Bar dataKey="synchronous" name="Synchronous" fill="#4F46E5" />
          )}
          {(!pathway || pathway === 'all' || pathway === 'asynchronous') && (
            <Bar dataKey="asynchronous" name="Asynchronous" fill="#059669" />
          )}
          {(!pathway || pathway === 'all' || pathway === 'blended') && (
            <Bar dataKey="blended" name="Blended" fill="#DC2626" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}