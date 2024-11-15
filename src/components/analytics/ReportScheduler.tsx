import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

type Schedule = {
  frequency: 'daily' | 'weekly' | 'monthly';
  day?: number;
  time: string;
  recipients: string[];
  reportType: 'summary' | 'detailed' | 'custom';
  format: 'pdf' | 'excel' | 'csv';
};

export function ReportScheduler() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    frequency: 'weekly',
    time: '09:00',
    recipients: [],
    reportType: 'summary',
    format: 'pdf'
  });

  const handleCreateSchedule = () => {
    setSchedules([...schedules, newSchedule]);
    setIsCreating(false);
    setNewSchedule({
      frequency: 'weekly',
      time: '09:00',
      recipients: [],
      reportType: 'summary',
      format: 'pdf'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Scheduled Reports</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Schedule New Report
        </button>
      </div>

      {/* Existing Schedules */}
      <div className="space-y-4">
        {schedules.map((schedule, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">
                  {schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1)} Report
                </p>
                <p className="text-sm text-gray-500">
                  {schedule.time} • {schedule.recipients.length} recipients
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const newSchedules = [...schedules];
                newSchedules.splice(index, 1);
                setSchedules(newSchedules);
              }}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Create New Schedule Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h4 className="text-lg font-medium mb-4">Schedule New Report</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  value={newSchedule.frequency}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    frequency: e.target.value as Schedule['frequency']
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {newSchedule.frequency === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Day of Week
                  </label>
                  <select
                    value={newSchedule.day}
                    onChange={(e) => setNewSchedule({
                      ...newSchedule,
                      day: parseInt(e.target.value)
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    time: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients (comma-separated emails)
                </label>
                <input
                  type="text"
                  value={newSchedule.recipients.join(', ')}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    recipients: e.target.value.split(',').map(email => email.trim())
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <select
                  value={newSchedule.reportType}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    reportType: e.target.value as Schedule['reportType']
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="summary">Summary Report</option>
                  <option value="detailed">Detailed Report</option>
                  <option value="custom">Custom Report</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  value={newSchedule.format}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    format: e.target.value as Schedule['format']
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSchedule}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}