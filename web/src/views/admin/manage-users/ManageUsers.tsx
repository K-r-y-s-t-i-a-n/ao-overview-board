import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Grid,
  Alert,
} from '@mantine/core';
import { IconAlertCircle, IconTrash } from '@tabler/icons-react';
import { useEmployees } from '../../../app/api/hooks/admin/useEmployees';
import {
  AppCard,
  LoadingElement,
  Notification,
  ViewWrapper,
} from '../../../components/core';
import NewUserModal from './NewUserModal';
import { usePermissions, useScreenSize } from '../../../app/hooks';
import { PERMISSIONS } from '../../../app/constants/permissions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserModal from './EditUserModal';
import { openConfirmModal } from '@mantine/modals';
import { api, queryKeys } from '../../../app/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee } from '../../../app/interfaces';

const ManageUsers = () => {
  const queryCache = useQueryClient();
  const canManageUsers = usePermissions(PERMISSIONS.EDIT_USERS);
  const navigate = useNavigate();
  const { employees, isLoading } = useEmployees();
  const theme = useMantineTheme();
  const { smMaxScreen } = useScreenSize();

  const deleteEmployee = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/admin/employees/${id}`);
    },
    onSuccess: () => {
      // queryCache.setQueryData([queryKeys.employees], () => []);
      queryCache.invalidateQueries([queryKeys.employees]);
      Notification({ success: true, message: 'The account has been deleted.' });
    },

    onError: ({ err }) =>
      Notification({ error: true, message: `Could not delete account: ${err.message}` }),
  });

  useEffect(() => {
    if (!canManageUsers) navigate('/');
  }, [canManageUsers, navigate]);

  if (!canManageUsers) return;

  const rows = employees
    .sort((a, b) => a.email.localeCompare(b.email))
    .map((employee) => (
      <tr key={employee.display_name + employee.id}>
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={employee.avatar} radius={30} />
            <Text fz="sm" fw={500}>
              {employee.display_name}
            </Text>
          </Group>
        </td>

        <td>
          <Badge
            color={employee.team.color || 'dark'}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
          >
            {employee.team.name || 'N/A'}
          </Badge>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {employee.role.name || 'No role assigned'}
          </Anchor>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {employee.email}
          </Text>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {/* {item.phone} */}
          </Text>
        </td>
        <td>
          {employee.display_name !== 'View Account' && (
            <Group spacing={0} position="right">
              <EditUserModal id={employee.id} employee={employee} />

              {/* ================ CONFIRM DELETE ================== */}
              <ActionIcon
                color="red"
                onClick={() => {
                  openConfirmModal({
                    title: (
                      <>
                        <h4>Account Deletion Confirmation</h4>
                      </>
                    ),
                    centered: true,
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
                          title={`Are you certain you want to proceed with deleting the account for`}
                          color="red"
                        >
                          <Text weight={500}>{employee.display_name} ?</Text>
                        </Alert>
                      </>
                    ),
                    labels: {
                      confirm: 'DELETE ACCOUNT',
                      cancel: 'Cancel',
                    },
                    onCancel: () => {
                      // setSelectedTagId(undefined);
                    },
                    onConfirm: () => deleteEmployee.mutate(employee.id),
                  });
                }}
              >
                <IconTrash size="1rem" stroke={1.5} />
              </ActionIcon>

              {/* =============================================================== */}
            </Group>
          )}
        </td>
      </tr>
    ));

  const getPadding = () => {
    if (smMaxScreen) {
      return { paddingLeft: 0, paddingRight: 0 };
    }
  };

  return (
    <ViewWrapper>
      <Grid>
        <Grid.Col span="auto" sx={getPadding()}>
          {/* <Button size="sm" mb={16} variant="light">
        + NEW USER
      </Button> */}
          <NewUserModal />
          {isLoading ? (
            <LoadingElement />
          ) : smMaxScreen ? (
            employees
              .sort((a, b) => a.email.localeCompare(b.email))
              .map((employee) => (
                <AppCard key={employee.email + 'employee'} mb={8}>
                  <Group noWrap>
                    <Avatar size="xl">
                      {employee.first_name[0].toUpperCase()}
                      {employee.last_name[0].toUpperCase()}
                    </Avatar>
                    <div>
                      <Text fz="md" fw={600}>
                        {employee.display_name}
                      </Text>
                      <Text fw={400} fz="sm">
                        Team: {employee.team.name || 'N/A'}
                      </Text>
                      <Text fw={400} fz="sm">
                        Role: {employee.role.name}
                      </Text>
                      {/* <Group>
                    <Button size="xs">Edit</Button>
                    <Button size="xs" color="red">
                      Delete
                    </Button>
                  </Group> */}
                    </div>
                  </Group>
                </AppCard>
              ))
          ) : (
            <AppCard>
              <ScrollArea sx={{ animation: 'slide-up .3s' }}>
                <Table
                  sx={{ minWidth: 800, overflow: 'scroll' }}
                  horizontalSpacing="sm"
                  verticalSpacing="sm"
                  highlightOnHover
                >
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Team</th>
                      <th>Access</th>
                      <th>Email</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </ScrollArea>
            </AppCard>
          )}
        </Grid.Col>
      </Grid>
    </ViewWrapper>
  );
};

export default ManageUsers;
