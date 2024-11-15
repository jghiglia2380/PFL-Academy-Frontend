import React, { useState } from 'react';
import type { LearningPathway } from '../types';
import { Users, Clock, Laptop } from 'lucide-react';

interface PathwaySelectionProps {
  onPathwaySelect: () => void;
}

export function PathwaySelection({ onPathwaySelect }: PathwaySelectionProps) {
  const [selectedPathway, setSelectedPathway] = useState<LearningPathway | null>(null);

  const pathways = [
    {
      id: 'synchronous',
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: 'Synchronous Learning',
      description: 'Participate in scheduled, instructor-led sessions with peer interaction and guided discussions.',
      benefits: [
        'Real-time interaction with instructors',
        'Structured class schedule',
        'Interactive group discussions',
        'Immediate feedback and support'
      ]
    },
    {
      id: 'asynchronous',
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: 'Asynchronous Learning',
      description: 'Learn at your own pace with flexible scheduling and self-guided content.',
      benefits: [
        'Flexible scheduling',
        'Self-paced learning',
        'Independent study',
        'Access to all course materials 24/7'
      ]
    },
    {
      id: 'blended',
      icon: <Laptop className="h-8 w-8 text-indigo-600" />,
      title: 'Blended Learning',
      description: 'Combine scheduled sessions with self-paced learning for maximum flexibility.',
      benefits: [
        'Mix of structured and flexible learning',
        'Option to attend classes or study independently',
        'Adaptable to changing schedules',
        'Best of both learning styles'
      ]
    }
  ];

  const handlePathwaySelect = (pathway: LearningPathway) => {
    setSelectedPathway(pathway);
    localStorage.setItem('learningPathway', pathway);
    onPathwaySelect();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Choose Your Learning Pathway
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Select the learning style that best fits your needs and schedule
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {pathways.map((pathway) => (
          <div
            key={pathway.id}
            className={`relative rounded-lg border-2 p-6 hover:border-indigo-500 transition-colors cursor-pointer ${
              selectedPathway === pathway.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200'
            }`}
            onClick={() => handlePathwaySelect(pathway.id as LearningPathway)}
          >
            <div className="mb-4">{pathway.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {pathway.title}
            </h3>
            <p className="text-gray-500 mb-4">{pathway.description}</p>
            <ul className="space-y-2">
              {pathway.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-4 w-4 text-indigo-500 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}