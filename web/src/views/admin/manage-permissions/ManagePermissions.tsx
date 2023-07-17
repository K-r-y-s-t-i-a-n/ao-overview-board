import { useEffect } from 'react';
import { PERMISSIONS, UI } from '../../../app/constants';
import {
  AppCard,
  CardTitle,
  LoadingElement,
  ViewWrapper,
} from '../../../components/core';
import { Badge, Grid, Group, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../../app/hooks';
import { useRolesData, usePermissionsData } from '../../../app/api/hooks/admin';
// import { usePermissions, useRolesData } from '../../../app/hooks/admin';

const ManagePermissions = () => {
  const canManageRoles = usePermissions(PERMISSIONS.EDIT_ROLES);
  const navigate = useNavigate();
  // const [isEditing, setIsEditing] = useState();
  const permissionsList = usePermissionsData();
  const rolesList = useRolesData();

  useEffect(() => {
    if (!canManageRoles) navigate('/');
  }, [canManageRoles, navigate]);

  return (
    <ViewWrapper>
      <Title mb={UI.PAGE_TITLE_MB}>Manage Roles & Permissions</Title>

      {permissionsList.isLoading ? (
        <LoadingElement />
      ) : (
        rolesList.data.map((role) => (
          <Grid grow>
            <Grid.Col span={2}>
              <CardTitle title={role.name} />
            </Grid.Col>

            <Grid.Col span={10}>
              <AppCard>
                <Group>
                  {role.permissions.length === 0 ? (
                    <Badge color="red">No permissions</Badge>
                  ) : (
                    <>
                      {role.permissions.map((userPermission) => (
                        <Badge>{userPermission.display_name}</Badge>
                      ))}
                    </>
                  )}
                </Group>
              </AppCard>
            </Grid.Col>
          </Grid>
        ))
      )}
    </ViewWrapper>
  );
};

export default ManagePermissions;
