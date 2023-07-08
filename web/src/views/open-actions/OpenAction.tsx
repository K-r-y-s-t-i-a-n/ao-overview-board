import { Badge, Card, Table } from '@mantine/core';
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

const elements = [
  {
    id: '0',
    asset: 'G25',
    status: 'stopped',
    issue: 'CX Axis Rails U/S',
    currentStatus: 'Schneider due to visit 16/1/22',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '1',
    asset: 'Laser 2',
    status: 'stopped',
    issue: 'Poor Engraving',
    currentStatus: 'Waiting response from laser Op',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '2',
    asset: 'G19',
    status: 'testing',
    issue: 'Diamond Crash',
    currentStatus: 'Requesting verification of actions from Schneider',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '3',
    asset: 'G18',
    status: 'rwi',
    issue: 'Lens icorrectly inserted',
    currentStatus: 'Shock absorber ordered - waiting for delivery',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '4',
    asset: 'Dispatch 1',
    status: 'rwi',
    issue: 'Not closing envelopes',
    currentStatus: 'A&R',
    lastUpdated: '14/01 11:05',
  },
  {
    id: '5',
    asset: 'G22',
    status: 'stopped',
    issue: 'C Axis concern',
    currentStatus: 'Test lenses sent to Schenider but stuck in custom',
    lastUpdated: '14/01 11:05',
  },
];

const OpenActions = () => {
  const ths = (
    <tr>
      <th>Asset</th>
      <th>Status</th>
      <th>Issue</th>
      <th>Current Status</th>
      <th>Last updated</th>
    </tr>
  );

  const rows = elements.map((el) => (
    <tr key={el.id}>
      <td>{el.asset}</td>
      <td>
        <Badge
          color={
            el.status === 'stopped'
              ? 'red'
              : el.status === 'rwi'
              ? 'blue'
              : el.status === 'testing'
              ? 'green'
              : 'gray'
          }
        >
          {el.status}
        </Badge>
      </td>
      <td>{el.issue}</td>
      <td>{el.currentStatus}</td>
      <td>{el.lastUpdated}</td>
    </tr>
  ));

  return (
    <>
      {/* <PageTitle title="Open actions" /> */}
      {/* <Stats data={statsData} /> */}

      <Card shadow="md" radius="md" sx={{ animation: 'slide-up .3s' }}>
        <Table striped highlightOnHover withColumnBorders>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
    </>
  );
};

export default OpenActions;
