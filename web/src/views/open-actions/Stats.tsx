import { createStyles, Text, rem, Badge } from '@mantine/core';
import { Action } from '../../app/interfaces';
import { format } from 'date-fns';

const getColor = (status: string) => {
  return status === 'Stopped'
    ? 'red'
    : status === 'RWI'
    ? 'blue'
    : status === 'Testing'
    ? 'green'
    : 'gray';
};
const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    // backgroundImage: `linear-gradient(-60deg, #c7dcbe 0%, #E2EFDD 100%)`,
    backgroundImage: `linear-gradient(-60deg, #E2EFDD 0%, #E2EFDD 100%)`,
    // backgroundImage: `linear-gradient(-60deg, ${
    //   theme.colors[theme.primaryColor][4]
    // } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * .8)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
    marginBottom: '1rem',
  },

  title: {
    color: theme.primaryColor,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.md,
  },

  count: {
    color: theme.primaryColor,
    fontSize: rem(22),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.primaryColor,
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

interface StatsGroupProps {
  data: Action;
}

export function StatsGroup({ data }: StatsGroupProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.stat}>
        <Text className={classes.title}>Asset</Text>
        {/* <Text className={classes.description}>{data.asset.name}</Text> */}
        <Badge color="gray" size="md">
          {data.asset.name}
        </Badge>
      </div>
      <div className={classes.stat}>
        <Text className={classes.title}>Status</Text>
        {/* <Text className={classes.description}>{data.status}</Text> */}
        <Badge color={getColor(data.status)} size="md">
          {data.status}
        </Badge>
      </div>
      <div className={classes.stat}>
        <Text className={classes.title}>Issue</Text>
        <Text className={classes.description}>{data.issue}</Text>
      </div>
      <div className={classes.stat}>
        <Text className={classes.title}>Created</Text>
        <Text className={classes.description}>
          {format(new Date(data.created_at), 'dd MMMM yyyy')}
        </Text>
      </div>
      <div className={classes.stat}>
        <Text className={classes.title}>Updated</Text>
        <Text className={classes.description}>
          {data.created_at !== data.steps[0].updated_at
            ? format(new Date(data.steps[0].updated_at), 'dd MMMM yyyy')
            : 'N/A'}
        </Text>
      </div>
    </div>
  );
}
