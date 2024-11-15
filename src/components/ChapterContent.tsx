import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, Users, Clock } from 'lucide-react';
import type { Chapter, LearningPathway } from '../types';
import { Quiz } from './Quiz';
import { Reflection } from './Reflection';
import { SkillBuilder } from './SkillBuilder';
import { KnowledgeCheck } from './KnowledgeCheck';
import { TeacherGuide } from './TeacherGuide';
import { useAuth } from '../contexts/AuthContext';
import { useLearningRecord } from '../hooks/useLearningRecord';

interface ChapterContentProps {
  chapter: Chapter;
  pathway: LearningPathway;
}

export function ChapterContent({ chapter, pathway }: ChapterContentProps) {
  const { role } = useAuth();
  const { recordInteraction } = useLearningRecord();

  React.useEffect(() => {
    recordInteraction(
      'started',
      chapter.id,
      'chapter',
      chapter.title,
      { completion: false },
      { standardId: chapter.standardId }
    );
  }, [chapter.id]);

  return (
    <div className="p-8 space-y-8">
      {/* Chapter Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
        <p className="text-gray-600 mb-4">{chapter.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Reading time: {chapter.readingTime}
          </span>
          {chapter.learningObjectives && (
            <span>•</span>
          )}
          {chapter.learningObjectives && (
            <span>{chapter.learningObjectives.length} Learning Objectives</span>
          )}
        </div>
      </div>

      {/* Learning Objectives */}
      {chapter.learningObjectives && (
        <div className="bg-indigo-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Learning Objectives</h2>
          <ul className="list-disc list-inside space-y-2 text-indigo-800">
            {chapter.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="prose prose-indigo max-w-none">
        {pathway === 'synchronous' && chapter.synchronousContent && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-700">
              This content is optimized for classroom discussion and group activities.
            </p>
          </div>
        )}
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          className="prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-800 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-800"
        >
          {pathway === 'synchronous' && chapter.synchronousContent
            ? chapter.synchronousContent
            : chapter.content}
        </ReactMarkdown>
      </div>

      {/* Knowledge Checks */}
      {chapter.knowledgeChecks?.map((check, index) => (
        <KnowledgeCheck
          key={index}
          check={check}
          onComplete={(score) => {
            recordInteraction(
              'completed',
              `${chapter.id}-knowledge-check-${index}`,
              'knowledge-check',
              `Knowledge Check ${index + 1}`,
              { score, completion: true },
              { standardId: chapter.standardId, chapterId: chapter.id }
            );
          }}
        />
      ))}

      {/* Reflections */}
      {chapter.reflections?.map((reflection, index) => (
        <Reflection
          key={index}
          reflection={reflection}
          onSubmit={(response) => {
            recordInteraction(
              'submitted',
              `${chapter.id}-reflection-${index}`,
              'reflection',
              `Reflection ${index + 1}`,
              { completion: true },
              { standardId: chapter.standardId, chapterId: chapter.id }
            );
          }}
        />
      ))}

      {/* Skill Builder */}
      {chapter.skillBuilder && (
        <SkillBuilder
          skillBuilder={chapter.skillBuilder}
          onComplete={(result) => {
            recordInteraction(
              'completed',
              `${chapter.id}-skill-builder`,
              'skillBuilder',
              chapter.skillBuilder.title,
              { ...result, completion: true },
              { standardId: chapter.standardId, chapterId: chapter.id }
            );
          }}
        />
      )}

      {/* Quiz */}
      {chapter.quiz && (
        <Quiz
          quiz={chapter.quiz}
          onComplete={(score) => {
            recordInteraction(
              'completed',
              `${chapter.id}-quiz`,
              'quiz',
              'Chapter Quiz',
              { score, completion: true },
              { standardId: chapter.standardId, chapterId: chapter.id }
            );
          }}
        />
      )}

      {/* Teacher Guide */}
      {role === 'educator' && (
        <TeacherGuide chapter={chapter} pathway={pathway} />
      )}
    </div>
  );
}