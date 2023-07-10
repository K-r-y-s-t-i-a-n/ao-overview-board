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
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEmployees } from '../../../app/api/hooks/admin/useEmployees';
import { AppCard, LoadingElement, ViewWrapper } from '../../../components/core';
import NewUserModal from './NewUserModal';
import { usePermissions } from '../../../app/hooks';
import { PERMISSIONS } from '../../../app/constants/permissions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const canManageUsers = usePermissions(PERMISSIONS.EDIT_USERS);
  const navigate = useNavigate();
  const { employees, isLoading } = useEmployees();
  const theme = useMantineTheme();

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
            {employee.role || 'No role assigned'}
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
              <ActionIcon>
                <IconPencil size="1rem" stroke={1.5} />
              </ActionIcon>
              <ActionIcon color="red">
                <IconTrash size="1rem" stroke={1.5} />
              </ActionIcon>
            </Group>
          )}
        </td>
      </tr>
    ));

  return (
    <ViewWrapper>
      {/* <Button size="sm" mb={16} variant="light">
        + NEW USER
      </Button> */}
      <NewUserModal />
      <ScrollArea sx={{ animation: 'slide-up .3s' }}>
        <AppCard>
          {isLoading ? (
            <LoadingElement />
          ) : (
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
          )}
        </AppCard>
      </ScrollArea>
    </ViewWrapper>
  );
};

export default ManageUsers;
