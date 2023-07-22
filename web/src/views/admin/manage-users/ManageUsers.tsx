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
import ConfirmTeamDelete from './ConfirmTeamDelete';
import EditTeamModal from './EditTeamModal';
import { Team } from '../../../app/interfaces';

//! COMPONENT
const ManageUsers = () => {
  const canManageUsers = usePermissions(PERMISSIONS.EDIT_USERS);
  const navigate = useNavigate();
  const { employees, isLoading } = useEmployees();
  const [teamsQuery, setTeamsQuery] = useState<Team[]>([]);
  const teamsQueryData = useTeams();
  const theme = useMantineTheme();
  const { smMaxScreen, mdMaxScreen } = useScreenSize();
  const [displaying, setDisplaying] = useState<'users' | 'teams'>('users');

  useEffect(() => {
    setTeamsQuery(teamsQueryData.data);
  }, [teamsQueryData.data]);

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
        {/* <NewUserModal /> */}
        {isLoading ? (
          <LoadingElement text="Loading users" />
        ) : (
          //! NORMAL SCREEN
          <AppCard>
            <ScrollArea sx={{ animation: 'slide-up .3s' }}>
              <Table
                sx={{ overflow: 'scroll' }}
                horizontalSpacing="sm"
                verticalSpacing="sm"
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th>Account Name</th>
                    {!smMaxScreen && (
                      <>
                        <th>Team</th>
                        <th>Access</th>
                        {!mdMaxScreen && <th>Email</th>}
                      </>
                    )}

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
                        {!smMaxScreen && (
                          <>
                            <td>
                              <Badge
                                color={employee.team.color || 'dark'}
                                variant={
                                  theme.colorScheme === 'dark' ? 'light' : 'outline'
                                }
                              >
                                {employee.team.name || 'N/A'}
                              </Badge>
                            </td>
                            <td>{employee.role.name || 'No role assigned'}</td>
                            {!mdMaxScreen && (
                              <td>
                                <Text fz="sm" c="dimmed">
                                  {employee.email}
                                </Text>
                              </td>
                            )}
                          </>
                        )}
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
        {/* <NewTeamModal /> */}
        {isLoading ? (
          <LoadingElement text="Loading users" />
        ) : (
          //! NORMAL SCREEN
          <AppCard>
            <ScrollArea sx={{ animation: 'slide-up .3s' }}>
              <Table
                sx={{ overflow: 'scroll' }}
                horizontalSpacing="sm"
                verticalSpacing="sm"
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Colour</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {teamsQuery
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((team) => (
                      <tr key={team.id + 'teamM'}>
                        <td>
                          <Text fw={500}>{team.name}</Text>
                        </td>
                        <td>
                          <Badge color={team.color}>{team.color}</Badge>
                        </td>
                        <td></td>
                        <td>
                          <Group spacing={0} position="right">
                            <EditTeamModal team={team} />
                            <ConfirmTeamDelete team={team} />
                          </Group>
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

  //! ==========   JSX    ============
  return (
    <ViewWrapper>
      {/* <Group position="apart" mb={UI.PAGE_TITLE_MB}> */}
      <Title mb={UI.PAGE_TITLE_MB}>Manage Users & Teams</Title>
      {displaying === 'teams' ? <NewTeamModal /> : <NewUserModal />}
      <SegmentedControl
        fullWidth
        sx={{ width: '100%' }}
        size="sm"
        data={[
          { label: 'Users', value: 'users' },
          { label: 'Teams', value: 'teams' },
        ]}
        value={displaying}
        onChange={(v) => setDisplaying(v as 'teams' | 'users')}
      />
      {/* </Group> */}
      {displaying === 'teams' ? teamsView : usersView}
    </ViewWrapper>
  );
};

export default ManageUsers;
