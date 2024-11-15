import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LtiContext, LtiToken } from '../types/lti';

const LtiContext = createContext<LtiContext>({
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
});

export function LtiProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<LtiToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateLtiSession = async () => {
      try {
        const response = await fetch('/api/lti/validate');
        if (!response.ok) throw new Error('Invalid LTI session');
        
        const data = await response.json();
        setToken(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to validate LTI session');
      } finally {
        setLoading(false);
      }
    };

    validateLtiSession();
  }, []);

  return (
    <LtiContext.Provider 
      value={{
        token,
        isAuthenticated: !!token,
        loading,
        error,
      }}
    >
      {children}
    </LtiContext.Provider>
  );
}

export function useLti() {
  const context = useContext(LtiContext);
  if (!context) {
    throw new Error('useLti must be used within an LtiProvider');
  }
  return context;
}