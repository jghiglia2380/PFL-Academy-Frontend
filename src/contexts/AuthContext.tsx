import React, { createContext, useContext, useState } from 'react';

type UserRole = 'student' | 'educator' | 'admin';

interface AuthContextType {
  role: UserRole;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role] = useState<UserRole>('student');
  const [isLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}