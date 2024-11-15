import React from 'react';
import { BookOpen, Users, Clock } from 'lucide-react';
import type { Chapter, LearningPathway } from '../types';

interface TeacherGuideProps {
  chapter: Chapter;
  pathway: LearningPathway;
}

export function TeacherGuide({ chapter, pathway }: TeacherGuideProps) {
  if (!chapter.teacherGuide) return null;

  const guide = chapter.teacherGuide;

  return (
    <div className="mt-8 border-t pt-8">
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Teacher Guide</h2>

        {/* Learning Objectives */}
        <section className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Learning Objectives</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            {guide.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>

        {/* Discussion Prompts */}
        <section className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Discussion Prompts</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-700">
            {guide.discussionPrompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </section>

        {/* Pacing Guide */}
        <section className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Suggested Pacing</h3>
          <div className="grid grid-cols-3 gap-4 text-blue-700">
            <div>
              <p className="font-medium">Minimum</p>
              <p>{guide.pacing.minimum}</p>
            </div>
            <div>
              <p className="font-medium">Suggested</p>
              <p>{guide.pacing.suggested}</p>
            </div>
            <div>
              <p className="font-medium">Maximum</p>
              <p>{guide.pacing.maximum}</p>
            </div>
          </div>
        </section>

        {/* Differentiation Strategies */}
        <section className="mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Differentiation</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Support Strategies</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                {guide.differentiation.support.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Extension Activities</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                {guide.differentiation.extension.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h3 className="font-semibold text-blue-800 mb-2">Additional Resources</h3>
          <ul className="space-y-2">
            {guide.resources.map((resource, index) => (
              <li key={index} className="flex items-center text-blue-700">
                <span className="mr-2">
                  {resource.type === 'video' && <BookOpen className="h-4 w-4" />}
                  {resource.type === 'article' && <Users className="h-4 w-4" />}
                  {resource.type === 'worksheet' && <Clock className="h-4 w-4" />}
                </span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}