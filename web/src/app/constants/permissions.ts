export const PERMISSIONS = {
  // ROLES
  EDIT_USERS: 'edit_users',
  EDIT_ROLES: 'edit_roles',
  // NOTES
  VIEW_NOTES: 'view_notes',
  CREATE_NOTES: 'create_notes',
  //ACTIONS
  VIEW_ACTIONS: 'view_actions',
  CREATE_ACTIONS: 'create_actions',
  CREATE_ACTION_STEPS: 'edit_actions',
  EDIT_ACTION_STATUS: 'edit_actionsStatus',
  CLOSE_DELETE_ACTION: 'delete_actions',
  VIEW_ARCHIVED_ACTIONS: 'view_actionsDeleted',
  DELETE_PERM_ACTIONS: 'delete_actionsPerm',
  RESTORE_DELETED_ACTION: 'edit_actionsPerm',
};

export type PermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
