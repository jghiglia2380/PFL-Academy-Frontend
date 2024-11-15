export interface LtiToken {
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  };
  platformContext: {
    platform: {
      contactEmail: string;
      description: string;
      guid: string;
      name: string;
      productFamilyCode: string;
      url: string;
      version: string;
    };
    resource: {
      id: string;
      title: string;
      description?: string;
    };
    context: {
      id: string;
      label: string;
      title: string;
      type: string[];
    };
  };
  clientId: string;
  deploymentId: string;
  targetLinkUri: string;
  messageType: string;
  version: string;
  roles: string[];
}

export interface LtiContext {
  token: LtiToken | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}