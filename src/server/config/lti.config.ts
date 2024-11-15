export const ltiConfig = {
  // Session configuration
  session: {
    timeoutMinutes: 120, // 2 hours
    renewalThresholdMinutes: 15, // Prompt renewal when 15 minutes remain
  },
  
  // Grade passback configuration
  grading: {
    types: ['final', 'progress', 'module', 'activity'],
    maxRetries: 3,
    retryDelayMs: 1000,
  },
  
  // Deep linking configuration
  deepLinking: {
    allowedTypes: ['standard', 'chapter', 'activity'],
    allowedPathways: ['synchronous', 'asynchronous', 'blended'],
  },
  
  // Privacy and data sharing
  privacy: {
    requiredClaims: ['sub', 'name', 'email'],
    optionalClaims: ['picture', 'locale'],
    anonymizeData: process.env.ANONYMIZE_DATA === 'true',
  },
  
  // Platform-specific configurations
  platforms: {
    canvas: {
      authEndpoint: '/api/auth/canvas',
      gradeSyncEndpoint: '/api/grades/canvas',
    },
    blackboard: {
      authEndpoint: '/api/auth/blackboard',
      gradeSyncEndpoint: '/api/grades/blackboard',
    },
    googleClassroom: {
      authEndpoint: '/api/auth/google',
      gradeSyncEndpoint: '/api/grades/google',
    },
  }
};