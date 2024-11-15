import { LearningPathway } from '../types';

interface LearningRecord {
  id: string;
  userId: string;
  verb: string;
  object: {
    id: string;
    type: 'standard' | 'chapter' | 'quiz' | 'reflection' | 'skillBuilder';
    name: string;
  };
  result?: {
    score?: number;
    success?: boolean;
    completion?: boolean;
    duration?: string;
  };
  context: {
    pathway: LearningPathway;
    standardId?: string;
    chapterId?: string;
  };
  timestamp: Date;
}

export class LearningRecordStore {
  private static records = new Map<string, LearningRecord[]>();

  static recordInteraction(
    userId: string,
    verb: string,
    objectId: string,
    objectType: LearningRecord['object']['type'],
    objectName: string,
    pathway: LearningPathway,
    result?: LearningRecord['result'],
    context?: Partial<LearningRecord['context']>
  ) {
    const record: LearningRecord = {
      id: crypto.randomUUID(),
      userId,
      verb,
      object: {
        id: objectId,
        type: objectType,
        name: objectName
      },
      result,
      context: {
        pathway,
        ...context
      },
      timestamp: new Date()
    };

    const userRecords = this.records.get(userId) || [];
    userRecords.push(record);
    this.records.set(userId, userRecords);

    // Convert to xAPI statement and send to external LRS if configured
    this.sendToExternalLRS(this.convertToXAPI(record));

    return record;
  }

  static getUserRecords(userId: string, filters?: {
    verb?: string;
    objectType?: LearningRecord['object']['type'];
    pathway?: LearningPathway;
    startDate?: Date;
    endDate?: Date;
  }): LearningRecord[] {
    const records = this.records.get(userId) || [];
    
    if (!filters) return records;

    return records.filter(record => {
      if (filters.verb && record.verb !== filters.verb) return false;
      if (filters.objectType && record.object.type !== filters.objectType) return false;
      if (filters.pathway && record.context.pathway !== filters.pathway) return false;
      if (filters.startDate && record.timestamp < filters.startDate) return false;
      if (filters.endDate && record.timestamp > filters.endDate) return false;
      return true;
    });
  }

  static getPathwayAnalytics(userId: string, pathway: LearningPathway) {
    const records = this.getUserRecords(userId, { pathway });
    
    return {
      totalInteractions: records.length,
      completedActivities: records.filter(r => r.result?.completion).length,
      averageScore: this.calculateAverageScore(records),
      timeSpent: this.calculateTotalDuration(records),
      lastAccessed: this.getLastAccessDate(records)
    };
  }

  private static convertToXAPI(record: LearningRecord) {
    return {
      actor: {
        objectType: 'Agent',
        account: {
          homePage: 'https://pflacademy.com',
          name: record.userId
        }
      },
      verb: {
        id: `http://adlnet.gov/expapi/verbs/${record.verb}`,
        display: { 'en-US': record.verb }
      },
      object: {
        id: `https://pflacademy.com/activities/${record.object.id}`,
        definition: {
          type: `http://adlnet.gov/expapi/activities/${record.object.type}`,
          name: { 'en-US': record.object.name }
        }
      },
      result: record.result,
      context: {
        contextActivities: {
          category: [{
            id: `https://pflacademy.com/pathways/${record.context.pathway}`,
            definition: {
              type: 'http://adlnet.gov/expapi/activities/category'
            }
          }]
        }
      },
      timestamp: record.timestamp.toISOString()
    };
  }

  private static async sendToExternalLRS(statement: any) {
    // Implementation for sending to external LRS would go here
    // This is a placeholder for future implementation
    console.log('Sending to external LRS:', statement);
  }

  private static calculateAverageScore(records: LearningRecord[]): number {
    const scores = records
      .filter(r => r.result?.score !== undefined)
      .map(r => r.result!.score!);
    
    if (scores.length === 0) return 0;
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  private static calculateTotalDuration(records: LearningRecord[]): string {
    const totalMs = records
      .filter(r => r.result?.duration)
      .reduce((sum, r) => sum + this.parseDuration(r.result!.duration!), 0);
    
    return this.formatDuration(totalMs);
  }

  private static getLastAccessDate(records: LearningRecord[]): Date | null {
    if (records.length === 0) return null;
    return new Date(Math.max(...records.map(r => r.timestamp.getTime())));
  }

  private static parseDuration(duration: string): number {
    // Simple duration parser for ISO 8601 durations
    const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) return 0;
    
    const [, hours, minutes, seconds] = matches;
    return (
      (parseInt(hours || '0') * 3600000) +
      (parseInt(minutes || '0') * 60000) +
      (parseInt(seconds || '0') * 1000)
    );
  }

  private static formatDuration(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    return `PT${hours ? hours + 'H' : ''}${minutes ? minutes + 'M' : ''}${seconds}S`;
  }
}</content></file>

<boltAction type="file" filePath="src/hooks/useLearningRecord.ts">import { useState } from 'react';
import { LearningRecordStore } from '../services/LearningRecordStore';
import { LearningPathway } from '../types';
import { useLti } from '../contexts/LtiContext';

export function useLearningRecord() {
  const { token } = useLti();
  const [isRecording, setIsRecording] = useState(false);

  const recordInteraction = async (
    verb: string,
    objectId: string,
    objectType: 'standard' | 'chapter' | 'quiz' | 'reflection' | 'skillBuilder',
    objectName: string,
    result?: {
      score?: number;
      success?: boolean;
      completion?: boolean;
      duration?: string;
    },
    context?: {
      standardId?: string;
      chapterId?: string;
    }
  ) => {
    if (!token?.user.id) return;

    setIsRecording(true);
    try {
      const pathway = localStorage.getItem('learningPathway') as LearningPathway || 'asynchronous';
      
      const record = await LearningRecordStore.recordInteraction(
        token.user.id,
        verb,
        objectId,
        objectType,
        objectName,
        pathway,
        result,
        context
      );

      return record;
    } catch (error) {
      console.error('Failed to record learning interaction:', error);
      throw error;
    } finally {
      setIsRecording(false);
    }
  };

  const getPathwayAnalytics = (pathway: LearningPathway) => {
    if (!token?.user.id) return null;
    return LearningRecordStore.getPathwayAnalytics(token.user.id, pathway);
  };

  return {
    recordInteraction,
    getPathwayAnalytics,
    isRecording
  };
}</content></file>

<boltAction type="file" filePath="src/components/PathwayAnalytics.tsx">import React from 'react';
import { useLearningRecord } from '../hooks/useLearningRecord';
import { LearningPathway } from '../types';
import { Clock, Award, BookOpen, TrendingUp } from 'lucide-react';

interface PathwayAnalyticsProps {
  pathway: LearningPathway;
}

export function PathwayAnalytics({ pathway }: PathwayAnalyticsProps) {
  const { getPathwayAnalytics } = useLearningRecord();
  const analytics = getPathwayAnalytics(pathway);

  if (!analytics) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {pathway.charAt(0).toUpperCase() + pathway.slice(1)} Learning Analytics
      </h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={<BookOpen className="h-6 w-6 text-indigo-600" />}
          label="Total Interactions"
          value={analytics.totalInteractions.toString()}
        />
        
        <Stat
          icon={<Award className="h-6 w-6 text-green-600" />}
          label="Completed Activities"
          value={analytics.completedActivities.toString()}
        />
        
        <Stat
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          label="Average Score"
          value={`${Math.round(analytics.averageScore)}%`}
        />
        
        <Stat
          icon={<Clock className="h-6 w-6 text-purple-600" />}
          label="Time Spent"
          value={formatDuration(analytics.timeSpent)}
        />
      </div>

      {analytics.lastAccessed && (
        <p className="text-sm text-gray-500 mt-4">
          Last accessed: {analytics.lastAccessed.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

function Stat({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center mb-2">
        {icon}
        <span className="ml-2 text-sm font-medium text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function formatDuration(duration: string): string {
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return '0m';

  const [, hours, minutes, seconds] = matches;
  const parts = [];

  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds && !hours) parts.push(`${seconds}s`);

  return parts.join(' ');
}</content></file>

<boltAction type="start">
<command>npm run dev</command>