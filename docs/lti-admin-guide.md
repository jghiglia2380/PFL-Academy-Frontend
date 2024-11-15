## PFL Academy LTI Integration Guide

### Overview
This guide provides instructions for LMS administrators to integrate PFL Academy using LTI 1.3.

### Supported Platforms
- Canvas
- Blackboard
- Google Classroom

### Setup Instructions

#### General Configuration
1. Register PFL Academy as an LTI tool in your LMS
2. Configure authentication using the provided credentials
3. Set up grade passback services
4. Configure deep linking settings

#### Platform-Specific Instructions

##### Canvas
1. Navigate to Admin Settings > Developer Keys
2. Create a new LTI Key
3. Configure the following:
   - Target URL: `https://your-domain.com/lti/launch`
   - Login URL: `https://your-domain.com/lti/auth`
   - Domain: `your-domain.com`
   - Privacy Level: `Public`
   - Assignment Selection: `Enabled`

##### Blackboard
1. System Admin > LTI Tool Providers
2. Register New Tool Provider
3. Configure:
   - Provider Domain: `your-domain.com`
   - Tool Provider Key: (provided)
   - Tool Provider Secret: (provided)
   - Enable deep linking and grade passback

##### Google Classroom
1. Configure through Google Admin Console
2. Add LTI 1.3 tool
3. Configure OAuth consent and credentials

### Troubleshooting

#### Common Issues
1. Authentication Failures
   - Verify credentials
   - Check SSL configuration
   - Confirm whitelist settings

2. Grade Passback Issues
   - Verify service endpoints
   - Check permission settings
   - Review error logs

3. Deep Linking Problems
   - Confirm content selection enabled
   - Verify resource types
   - Check role permissions

### Privacy and Security

#### Data Handling
- Student data anonymization options
- Configurable claim sharing
- FERPA compliance settings

#### Session Management
- Timeout settings
- Renewal policies
- State preservation

### Support Resources
- Technical Support: support@pflacademy.com
- Documentation: docs.pflacademy.com
- Integration Help: lti-help@pflacademy.com