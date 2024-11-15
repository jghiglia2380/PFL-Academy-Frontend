import { LtiToken } from '../../types/lti';
import { lti } from '../lti';

export interface DeepLinkOptions {
  type: 'standard' | 'chapter' | 'activity';
  pathway?: 'synchronous' | 'asynchronous' | 'blended';
  roles?: string[];
  customParams?: Record<string, any>;
}

export class DeepLinkingService {
  static async createResourceLink(token: LtiToken, options: DeepLinkOptions) {
    try {
      const baseUrl = process.env.APP_URL || 'http://localhost:3000';
      let resourceUrl = `${baseUrl}/launch`;

      // Add pathway and content type parameters
      if (options.pathway) {
        resourceUrl += `?pathway=${options.pathway}`;
      }
      if (options.type !== 'standard') {
        resourceUrl += `${options.pathway ? '&' : '?'}type=${options.type}`;
      }

      const resource = {
        type: 'ltiResourceLink',
        title: this.getResourceTitle(options),
        url: resourceUrl,
        custom: {
          ...options.customParams,
          resource_type: options.type,
          allowed_roles: options.roles?.join(',')
        }
      };

      return lti.DeepLinking.createDeepLinkingMessage(token, resource, {
        message: 'Resource successfully created'
      });
    } catch (error) {
      console.error('Deep linking error:', error);
      throw new Error('Failed to create deep link');
    }
  }

  private static getResourceTitle(options: DeepLinkOptions): string {
    const pathwayLabel = options.pathway 
      ? `(${options.pathway.charAt(0).toUpperCase() + options.pathway.slice(1)})`
      : '';
    
    switch (options.type) {
      case 'chapter':
        return `PFL Chapter ${pathwayLabel}`;
      case 'activity':
        return `PFL Activity ${pathwayLabel}`;
      default:
        return `PFL Academy ${pathwayLabel}`;
    }
  }
}