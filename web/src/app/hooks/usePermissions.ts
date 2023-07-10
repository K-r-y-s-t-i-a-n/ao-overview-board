import { PermissionType, PERMISSIONS } from '../constants/permissions';
import { useUserStore } from '../store';

export const usePermissions = (permission: PermissionType) => {
  const user = useUserStore((store) => store.data);

  if (!user || !user?.role.name || !user?.role.permissions) {
    return null;
  }

  const usersPermissions = user.role.permissions.map((permission) => permission.name);

  return usersPermissions.includes(permission);
};

export const useHasAdnminPermissions = () => {
  const user = useUserStore((store) => store.data);

  if (!user || !user?.role.name || !user?.role.permissions) {
    return null;
  }

  const usersPermissions = user.role.permissions.map((permission) => permission.name);

  const adminAccess = [PERMISSIONS.EDIT_USERS, PERMISSIONS.EDIT_ROLES];

  return usersPermissions.some((item) => adminAccess.includes(item));
};
