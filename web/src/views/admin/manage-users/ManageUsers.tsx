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

// const jobColors: Record<string, string> = {
//   engineer: 'blue',
//   manager: 'cyan',
//   designer: 'pink',
// };

const ManageUsers = () => {
  const { employees } = useEmployees();
  const theme = useMantineTheme();
  const rows = employees.map((employee) => (
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
          color={employee.team?.color || ''}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {employee.team?.name || ''}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {employee.email}
        </Anchor>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {/* {item.phone} */}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job title</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default ManageUsers;
