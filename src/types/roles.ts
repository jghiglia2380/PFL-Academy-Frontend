export type UserRole = 'admin' | 'educator' | 'student';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RolePermissions {
  admin: Permission[];
  educator: Permission[];
  student: Permission[];
}

export const PERMISSIONS: RolePermissions = {
  admin: [
    { id: 'manage_users', name: 'Manage Users', description: 'Create, update, and delete users' },
    { id: 'manage_content', name: 'Manage Content', description: 'Edit curriculum content and structure' },
    { id: 'view_analytics', name: 'View Analytics', description: 'Access platform-wide analytics and reports' },
    { id: 'manage_settings', name: 'Manage Settings', description: 'Configure platform settings' }
  ],
  educator: [
    { id: 'view_teacher_guides', name: 'View Teacher Guides', description: 'Access teacher-specific resources' },
    { id: 'manage_students', name: 'Manage Students', description: 'View and manage student progress' },
    { id: 'grade_assignments', name: 'Grade Assignments', description: 'Grade student submissions' },
    { id: 'customize_content', name: 'Customize Content', description: 'Customize content for their classes' }
  ],
  student: [
    { id: 'view_content', name: 'View Content', description: 'Access learning materials' },
    { id: 'submit_assignments', name: 'Submit Assignments', description: 'Submit assignments and quizzes' },
    { id: 'view_progress', name: 'View Progress', description: 'View personal progress' },
    { id: 'participate_discussions', name: 'Participate in Discussions', description: 'Participate in class discussions' }
  ]
};