export interface SkillBuilderStep {
  id: string;
  instruction: string;
  type: 'text' | 'choice' | 'file';
  options?: {
    id: string;
    text: string;
  }[];
}

export interface SkillBuilder {
  id: string;
  title: string;
  description: string;
  activity: string;
  steps?: SkillBuilderStep[];
  resources?: string[];
}

export interface Chapter {
  id: string;
  standardId: string;
  title: string;
  description: string;
  content: string;
  synchronousContent?: string;
  learningObjectives?: string[];
  readingTime?: string;
  activities?: {
    id: string;
    type: string;
    title: string;
    description: string;
    duration: string;
    groupSize: number;
  }[];
  knowledgeChecks?: {
    question: string;
    options: { id: string; text: string }[];
    correctId: string;
    explanation: string;
  }[];
  reflections?: {
    id: string;
    prompt: string;
    context?: string;
    minWords?: number;
    maxWords?: number;
    keyTerms?: string[];
  }[];
  skillBuilder?: SkillBuilder;
  quiz?: Quiz;
  teacherGuide?: TeacherGuide;
}

export interface Quiz {
  questions: {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
    }[];
    correctOptionId: string;
    explanation: string;
  }[];
}

export interface TeacherGuide {
  objectives: string[];
  discussionPrompts: string[];
  pacing: {
    minimum: string;
    suggested: string;
    maximum: string;
  };
  differentiation: {
    support: string[];
    extension: string[];
  };
  resources: {
    type: 'video' | 'article' | 'worksheet';
    title: string;
    url: string;
  }[];
}

export type LearningPathway = 'synchronous' | 'asynchronous' | 'blended';