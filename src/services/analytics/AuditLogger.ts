import { UserRole } from '../../types/roles';

interface AnalyticsAuditLog {
  timestamp: Date;
  userId: string;
  userRole: UserRole;
  action: 'view' | 'export' | 'schedule' | 'template';
  details: {
    reportType?: string;
    filters?: Record<string, any>;
    format?: string;
    success: boolean;
    error?: string;
  };
}

export class AnalyticsAuditLogger {
  private static logs: AnalyticsAuditLog[] = [];

  static logAccess(
    userId: string,
    userRole: UserRole,
    action: AnalyticsAuditLog['action'],
    details: AnalyticsAuditLog['details']
  ) {
    const log: AnalyticsAuditLog = {
      timestamp: new Date(),
      userId,
      userRole,
      action,
      details
    };

    this.logs.push(log);
    this.persistLog(log);
  }

  static getAccessLogs(filters?: {
    userId?: string;
    action?: AnalyticsAuditLog['action'];
    startDate?: Date;
    endDate?: Date;
  }): AnalyticsAuditLog[] {
    let filtered = this.logs;

    if (filters?.userId) {
      filtered = filtered.filter(log => log.userId === filters.userId);
    }
    if (filters?.action) {
      filtered = filtered.filter(log => log.action === filters.action);
    }
    if (filters?.startDate) {
      filtered = filtered.filter(log => log.timestamp >= filters.startDate!);
    }
    if (filters?.endDate) {
      filtered = filtered.filter(log => log.timestamp <= filters.endDate!);
    }

    return filtered;
  }

  private static persistLog(log: AnalyticsAuditLog) {
    // In a real implementation, this would persist to a database
    console.log('Analytics Audit Log:', log);
  }
}