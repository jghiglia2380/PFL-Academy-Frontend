import { createLogger, format, transports } from 'winston';
import { Request } from 'express';

export class AuditLogger {
  private static readonly logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new transports.File({ 
        filename: 'logs/audit.log',
        level: 'info'
      })
    ]
  });

  static logAccess(req: Request, userId: string, action: string) {
    this.logger.info('Access Log', {
      timestamp: new Date().toISOString(),
      userId,
      action,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      path: req.path,
      method: req.method
    });
  }

  static logDataAccess(userId: string, dataType: string, action: string) {
    this.logger.info('Data Access Log', {
      timestamp: new Date().toISOString(),
      userId,
      dataType,
      action
    });
  }

  static logSecurityEvent(event: string, details: any) {
    this.logger.warn('Security Event', {
      timestamp: new Date().toISOString(),
      event,
      details
    });
  }

  static logComplianceCheck(userId: string, requirement: string, status: string) {
    this.logger.info('Compliance Check', {
      timestamp: new Date().toISOString(),
      userId,
      requirement,
      status
    });
  }
}