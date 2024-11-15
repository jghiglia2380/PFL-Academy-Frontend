import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/roles';

interface ProtectedContentProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

export function ProtectedContent({
  children,
  requiredRole,
  requiredPermission,
  fallback = null
}: ProtectedContentProps) {
  const { role, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const hasAccess = (
    (!requiredRole || role === requiredRole || role === 'admin') &&
    (!requiredPermission || hasPermission(requiredPermission))
  );

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}