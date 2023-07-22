import { useEffect } from 'react';
import { PERMISSIONS, UI } from '../../../app/constants';
import {
  AppCard,
  LoadingElement,
  ViewWrapper,
  Notification,
} from '../../../components/core';
import {
  ActionIcon,
  Alert,
  Badge,
  Group,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { usePermissions, useScreenSize } from '../../../app/hooks';
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
  const { smMaxScreen } = useScreenSize();

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
        <AppCard>
          <ScrollArea sx={{ animation: 'slide-up .3s' }}>
            <Table striped withColumnBorders>
              <thead>
                <tr>
                  <th>Name</th>
                  {!smMaxScreen && <th>Permissions</th>}
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {rolesList.data.map((role) => (
                  <tr>
                    <td>
                      <Text fw={600}>{role.name}</Text>
                    </td>
                    {!smMaxScreen && (
                      <td>
                        <Group>
                          {role.permissions.map((permission) => (
                            <Badge
                              key={permission.id + role.id + 'rolep'}
                              variant="outline"
                            >
                              {permission.display_name}
                            </Badge>
                          ))}
                        </Group>
                      </td>
                    )}

                    <td>
                      <EditRoleModal role={role} />
                    </td>
                    <td>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          openConfirmModal({
                            title: <Text fw={600}>Role Deletion</Text>,
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
                                  title={`Are you certain you want to proceed with deleting ${role.name} role?`}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        </AppCard>
      )}
    </ViewWrapper>
  );
};

export default ManagePermissions;
