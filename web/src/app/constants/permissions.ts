export const PERMISSIONS = {
  // USER ROUTES
  VIEW_NOTES: 'view_notes',
  CREATE_NOTES: 'create_notes',
  VIEW_ACTIONS: 'view_actions',
  // EDIT_OPEN_ACTIONS: 'edit_openActions',
  CREATE_ACTIONS: 'create_actions',
  // DELETE_OPEN_ACTIONS: 'delete_openActions',
  // VIEW_WEEKLY_UPDATES: 'view_weeklyUpdates',
  // DELETE_WEEKLY_UPDATES: 'delete_weeklyUpdates',
  // EDIT_WEEKLY_UPDATES: 'edit_weeklyUpdates',
  // CREATE_WEEKLY_UPDATES: 'create_weeklyUpdates',
  // VIEW_OVERDUE_PMS: 'view_overduePms',
  // CREATE_OVERDUE_PMS: 'create_overduePms',
  // EDIT_OVERDUE_PMS: 'edit_overduePms',
  // DELETE_OVERDUE_PMS: 'delete_overduePms',

  // ADMIN ROUTES
  // VIEW_USERS_MANAGEMENT: 'view_usersManagement',
  // CREATE_USERS: 'create_usersManagement',
  EDIT_USERS: 'edit_users',
  // DELETE_USERS: 'delete_usersManagement',
  // VIEW_ROLES_AND_PERMISSIONS: 'view_rolesAndPermissions',
  // CREATE_ROLES_AND_PERMISSIONS: 'create_rolesAndPermissions',
  EDIT_ROLES: 'edit_roles',
  // DELETE_ROLES_AND_PERMISSIONS: 'delete_rolesAndPermissions',
};

export type PermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
