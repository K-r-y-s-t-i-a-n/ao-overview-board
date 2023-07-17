import { useEffect } from 'react';
import { PERMISSIONS, UI } from '../../../app/constants';
import {
  AppCard,
  CardTitle,
  LoadingElement,
  ViewWrapper,
  Notification,
} from '../../../components/core';
import { ActionIcon, Alert, Badge, Grid, Group, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../../app/hooks';
import { useRolesData, usePermissionsData } from '../../../app/api/hooks/admin';
import NewRoleModal from './NewRoleModal';
import EditRoleModal from './EditRoleModal';
import { openConfirmModal } from '@mantine/modals';
import { IconAlertCircle, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '../../../app/api';
import { AxiosError } from 'axios';
import { Role } from '../../../app/interfaces/role.interface';

const ManagePermissions = () => {
  const canManageRoles = usePermissions(PERMISSIONS.EDIT_ROLES);
  const queryCache = useQueryClient();
  const navigate = useNavigate();
  const permissionsList = usePermissionsData();
  const rolesList = useRolesData();

  useEffect(() => {
    if (!canManageRoles) navigate('/');
  }, [canManageRoles, navigate]);

  const deleteRole = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/roles/${id}`);
    },
    onSuccess: (res) => {
      queryCache.setQueryData([queryKeys.roles], (roles?: Role[]) => {
        if (roles) {
          const filteredEmployees = roles.filter((obj) => obj.id != res.data.id);
          return filteredEmployees || undefined;
        }
      });
      queryCache.invalidateQueries([queryKeys.roles]);
      queryCache.invalidateQueries([queryKeys.user]);
      Notification({ success: true, message: 'The role has been deleted.' });
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not delete the role. ${err.message}`,
        });
      }
    },
  });

  return (
    <ViewWrapper>
      <Title mb={UI.PAGE_TITLE_MB}>Manage Roles & Permissions</Title>
      <NewRoleModal />
      {permissionsList.isLoading ? (
        <LoadingElement />
      ) : (
        rolesList.data.map((role) => (
          <Grid grow key={role.id + 'role'}>
            <Grid.Col span={3}>
              <Group>
                <ActionIcon
                  color="red"
                  onClick={() => {
                    openConfirmModal({
                      title: (
                        <>
                          <h4>Role Deletion</h4>
                        </>
                      ),
                      confirmProps: {
                        color: 'red',
                        size: 'xs',
                        radius: 'md',
                      },
                      cancelProps: {
                        color: 'gray',
                        size: 'xs',
                        radius: 'md',
                      },
                      children: (
                        <>
                          <Alert
                            icon={<IconAlertCircle size="1rem" />}
                            title={`Are you certain you want to proceed with deleting the ${role.name} role?`}
                            color="red"
                          >
                            {/* <Text weight={500}>{employee.display_name} ?</Text> */}
                          </Alert>
                        </>
                      ),
                      labels: {
                        confirm: 'DELETE ROLE',
                        cancel: 'Cancel',
                      },
                      onCancel: () => {
                        // setSelectedTagId(undefined);
                      },
                      onConfirm: () => deleteRole.mutate(role.id),
                    });
                  }}
                >
                  <IconTrash size="1rem" stroke={1.5} />
                </ActionIcon>
                <EditRoleModal role={role} />
                <CardTitle title={role.name} variant="text" />
              </Group>
            </Grid.Col>

            <Grid.Col span={9} onClick={() => console.log('CCCCC')}>
              <AppCard
              // sx={{ '&:hover': { cursor: 'pointer', background: '#F8F9FA' } }}
              >
                <Group sx={{ animation: 'slide-left .3s' }}>
                  {role.permissions.length === 0 ? (
                    <Badge color="red">No permissions</Badge>
                  ) : (
                    <>
                      {role.permissions.map((userPermission) => (
                        <Badge
                          key={userPermission.display_name + 'rolep'}
                          variant="outline"
                        >
                          {userPermission.display_name}
                        </Badge>
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
