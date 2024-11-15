## PFL Academy API Documentation

### Authentication
All API requests require an API key to be included in the `X-API-KEY` header.

#### SSO Integration
- POST `/api/auth/google` - Authenticate with Google
- POST `/api/auth/microsoft` - Authenticate with Microsoft
- GET `/api/auth/session` - Validate session token

### Analytics
- GET `/api/analytics/overview` - Get platform overview
- GET `/api/analytics/progress/:studentId` - Get student progress
- GET `/api/analytics/engagement` - Get engagement metrics

### Progress Tracking
- GET `/api/progress/:studentId` - Get student progress
- POST `/api/progress/:studentId/update` - Update progress

### Error Responses
All endpoints may return the following error responses:
- 401 Unauthorized - Invalid or missing API key
- 403 Forbidden - Insufficient permissions
- 500 Internal Server Error - Server error

### Rate Limiting
API requests are limited to:
- 1000 requests per hour for analytics endpoints
- 5000 requests per hour for progress endpoints