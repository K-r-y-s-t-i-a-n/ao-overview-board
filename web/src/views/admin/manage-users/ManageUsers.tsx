import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ScrollArea,
  useMantineTheme,
  Grid,
  Title,
  SegmentedControl,
} from '@mantine/core';
import { useEmployees } from '../../../app/api/hooks/admin/useEmployees';
import { AppCard, LoadingElement, ViewWrapper } from '../../../components/core';
import NewUserModal from './NewUserModal';
import { usePermissions, useScreenSize } from '../../../app/hooks';
import { PERMISSIONS } from '../../../app/constants/permissions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserModal from './EditUserModal';
import { UI } from '../../../app/constants';
import ConfirmDelete from './ConfirmDelete';
import NewTeamModal from './NewTeamModal';
import { useTeams } from '../../../app/api/hooks/useTeams';

//! COMPONENT
const ManageUsers = () => {
  const canManageUsers = usePermissions(PERMISSIONS.EDIT_USERS);
  const navigate = useNavigate();
  const { employees, isLoading } = useEmployees();
  const teamsQuery = useTeams();
  const theme = useMantineTheme();
  const { smMaxScreen } = useScreenSize();
  const [displaying, setDisplaying] = useState<'users' | 'teams'>('users');

  useEffect(() => {
    if (!canManageUsers) navigate('/');
  }, [canManageUsers, navigate]);

  if (!canManageUsers) return;

  const getPadding = () => {
    if (smMaxScreen) {
      return { paddingLeft: 0, paddingRight: 0 };
    }
  };

  //! USERS VIEW
  const usersView = (
    <Grid>
      <Grid.Col span="auto" sx={getPadding()}>
        <NewUserModal />
        {isLoading ? (
          <LoadingElement text="Loading users" />
        ) : smMaxScreen ? (
          //! MOBILE SCREEN
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
          //! NORMAL SCREEN
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
                <tbody>
                  {employees
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
                        <td>{employee.role.name || 'No role assigned'}</td>
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
                              <ConfirmDelete employee={employee} />
                            </Group>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </ScrollArea>
          </AppCard>
        )}
      </Grid.Col>
    </Grid>
  );

  //! TEAMS VIEW
  const teamsView = (
    <Grid>
      <Grid.Col span="auto" sx={getPadding()}>
        <NewTeamModal />
        {isLoading ? (
          <LoadingElement text="Loading users" />
        ) : smMaxScreen ? (
          //! MOBILE SCREEN
          teamsQuery.data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((team) => (
              <AppCard key={team.id + 'teamM'} mb={8}>
                {team.name}
              </AppCard>
            ))
        ) : (
          //! NORMAL SCREEN
          <>
            <ScrollArea sx={{ animation: 'slide-up .3s' }}>
              {teamsQuery.data
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((team) => (
                  <AppCard key={team.id + 'teamM'} mb={8}>
                    {team.name}
                  </AppCard>
                ))}
            </ScrollArea>
          </>
        )}
      </Grid.Col>
    </Grid>
  );

  //! ==========   JSX    ============
  return (
    <ViewWrapper>
      <Group position="apart" mb={UI.PAGE_TITLE_MB}>
        <Title>Manage Users & Teams</Title>

        <SegmentedControl
          color="green"
          size="md"
          data={[
            { label: 'Users', value: 'users' },
            { label: 'Teams', value: 'teams' },
          ]}
          value={displaying}
          onChange={(v) => setDisplaying(v as 'teams' | 'users')}
        />
      </Group>
      {displaying === 'teams' ? teamsView : usersView}
    </ViewWrapper>
  );
};

export default ManageUsers;
