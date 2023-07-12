import { Anchor, Badge, Card, Grid, Group, ScrollArea, Table, Text } from '@mantine/core';
import NewActionModal from './NewActionModal';
import { AppCard, NothingFound, ViewWrapper } from '../../components/core';
import { usePermissions, useScreenSize } from '../../app/hooks';
import { PERMISSIONS } from '../../app/constants/permissions';
// import PageTitle from 'components/PageTitle';
// import { Stats } from './components/Stats';

// const statsData = [
//   {
//     'title': 'Stopeed',
//     'stats': '3',
//     'description': '2 Generatos, 1 Laser',
//   },
//   {
//     'title': 'Running with Issues',
//     'stats': '2',
//     'description': '1 Generator, 1 Dispatch Machine',
//   },
//   {
//     'title': 'Testing',
//     'stats': '1',
//     'description': '1 Generator',
//   },
// ];

// const elements = [];

const elements = [
  {
    id: '0',
    asset: 'G25',
    status: 'stopped',
    issue: 'CX Axis Rails U/S',
    currentStep: 'Schneider due to visit 16/1/22',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '1',
    asset: 'Laser 2',
    status: 'stopped',
    issue: 'Poor Engraving',
    currentStep: 'Waiting response from laser Op',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '2',
    asset: 'G19',
    status: 'testing',
    issue: 'Diamond Crash',
    currentStep: 'Schneider adjusted software settings',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '3',
    asset: 'G18',
    status: 'rwi',
    issue: 'Lens icorrectly inserted',
    currentStep: 'Shock absorber ordered - waiting for delivery',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '4',
    asset: 'Dispatch 1',
    status: 'rwi',
    issue: 'Not closing envelopes',
    currentStep: 'A&R',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '5',
    asset: 'G22',
    status: 'stopped',
    issue: 'C Axis concern',
    currentStep: 'Test lenses sent to Schenider but stuck in custom',
    lastUpdated: '14/01 11:05',
  },
];

const getColor = (status: string) => {
  return status === 'stopped'
    ? 'red'
    : status === 'rwi'
    ? 'blue'
    : status === 'testing'
    ? 'green'
    : 'gray';
};

const OpenActions = () => {
  const canCreateActions = usePermissions(PERMISSIONS.CREATE_ACTIONS);
  const { smMaxScreen } = useScreenSize();

  const getPadding = () => {
    if (smMaxScreen) {
      return { paddingLeft: 0, paddingRight: 0 };
    }
  };

  const ths = (
    <tr>
      <th>Asset</th>
      <th>Current Step</th>
      <th>Issue</th>
      <th>Status</th>
      <th>Last updated</th>
    </tr>
  );

  const rows = elements.map((el) => (
    <tr key={el.id}>
      <td>
        <Text fw={500}>{el.asset}</Text>
      </td>

      <td>
        <Anchor component="button">
          <Text
            // fw={500}
            color={getColor(el.status)}
          >
            {el.currentStep}
          </Text>
        </Anchor>
      </td>
      <td>{el.issue}</td>
      <td>
        <Badge color={getColor(el.status)}>{el.status}</Badge>
      </td>
      <td>{el.lastUpdated}</td>
    </tr>
  ));

  return (
    <ViewWrapper>
      <Grid>
        <Grid.Col span="auto" sx={getPadding()}>
          {/* <PageTitle title="Open actions" /> */}
          {/* <Stats data={statsData} /> */}
          {canCreateActions && <NewActionModal />}

          {elements.length === 0 ? (
            <NothingFound text="Looks like there are no actions at the moment" />
          ) : (
            <>
              {smMaxScreen ? (
                elements.map((el) => (
                  <AppCard key={el.id + 'el'} p={4} mb={8}>
                    <Badge
                      color={getColor(el.status)}
                      radius="sm"
                      w="100%"
                      m={0}
                      mb={4}
                      size="lg"
                      // variant="filled"
                    >
                      {el.asset}
                    </Badge>
                    <Group>
                      <Text fw={600} fz="sm" ml={2}>
                        Issue:
                      </Text>
                      <Text fw={500} fz="sm">
                        {el.issue}
                      </Text>
                    </Group>
                    <Group>
                      <Text fw={600} fz="sm" ml={2}>
                        Current step:
                      </Text>
                      <Text fw={500} fz="sm">
                        {el.currentStep}
                      </Text>
                    </Group>
                    <Group>
                      <Text fw={600} fz="sm" ml={2}>
                        Last updated:
                      </Text>
                      <Text fw={500} fz="sm">
                        {el.lastUpdated}
                      </Text>
                    </Group>
                  </AppCard>
                ))
              ) : (
                <Card shadow="md" m={0} radius="md" sx={{ animation: 'slide-up .3s' }}>
                  <ScrollArea>
                    <Table striped highlightOnHover withColumnBorders>
                      <thead>{ths}</thead>
                      <tbody>{rows}</tbody>
                    </Table>
                  </ScrollArea>
                </Card>
              )}
            </>
          )}
        </Grid.Col>
      </Grid>
    </ViewWrapper>
  );
};

export default OpenActions;
