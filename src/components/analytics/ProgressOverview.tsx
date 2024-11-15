import React from 'react';
import { useLearningRecord } from '../../hooks/useLearningRecord';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ProgressOverviewProps {
  timeRange: number;
}

export function ProgressOverview({ timeRange }: ProgressOverviewProps) {
  const { getPathwayAnalytics } = useLearningRecord();

  const synchronousAnalytics = getPathwayAnalytics('synchronous');
  const asynchronousAnalytics = getPathwayAnalytics('asynchronous');
  const blendedAnalytics = getPathwayAnalytics('blended');

  const data = [
    {
      name: 'Completed',
      value: (
        (synchronousAnalytics?.completedActivities || 0) +
        (asynchronousAnalytics?.completedActivities || 0) +
        (blendedAnalytics?.completedActivities || 0)
      )
    },
    {
      name: 'In Progress',
      value: Math.floor(Math.random() * 50) + 30 // Replace with actual data
    },
    {
      name: 'Not Started',
      value: Math.floor(Math.random() * 30) + 10 // Replace with actual data
    }
  ];

  const COLORS = ['#4F46E5', '#FCD34D', '#F87171'];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {data.map((item, index) => (
          <div key={item.name} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">{item.name}</p>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}