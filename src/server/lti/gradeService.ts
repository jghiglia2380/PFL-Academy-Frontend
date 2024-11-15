import { LtiToken } from '../../types/lti';
import { lti } from '../lti';

export interface GradeOptions {
  type: 'final' | 'progress' | 'module' | 'activity';
  weight?: number;
  maxScore?: number;
  comment?: string;
  extraParams?: Record<string, any>;
}

export class GradeService {
  static async submitGrade(token: LtiToken, score: number, options: GradeOptions) {
    try {
      const scoreData = {
        userId: token.user.id,
        scoreGiven: score,
        scoreMaximum: options.maxScore || 100,
        activityProgress: 'Completed',
        gradingProgress: 'FullyGraded',
        timestamp: new Date().toISOString(),
        comment: options.comment,
        ...options.extraParams
      };

      // Handle different grade types
      switch (options.type) {
        case 'progress':
          scoreData.activityProgress = score < 100 ? 'InProgress' : 'Completed';
          break;
        case 'module':
          scoreData.resourceId = `module_${options.extraParams?.moduleId}`;
          break;
        case 'activity':
          scoreData.resourceId = `activity_${options.extraParams?.activityId}`;
          break;
      }

      const result = await lti.Grade.scorePublish(token, scoreData);
      return result;
    } catch (error) {
      console.error('Grade submission error:', error);
      throw new Error('Failed to submit grade');
    }
  }
}