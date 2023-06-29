import { createStyles, Navbar, getStylesRef, rem, Box } from '@mantine/core';
import { IconSettings, IconLogout } from '@tabler/icons-react';
import { navigationLinks } from '../app/router';
import { NavLink } from 'react-router-dom';
import { useUserStore } from '../app/store';
import { useQueryClient } from '@tanstack/react-query';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
  // SPECSAVERS #E2EFDD #73b143 #008945 #016C42 #004B2E
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? '#004B2E' : '#73b143',
      // backgroundColor: theme.colorScheme === 'dark' ? '#009D56' : '#008945',

      color: theme.colorScheme === 'dark' ? '#e3e3e3' : '#ffffff',
      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? '#e3e3e3' : '#ffffff',
      },
    },
  },

  linkActive_old: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

interface Props {
  opened: boolean;
  setNavbarState: () => void;
}

const Sidebar = ({ opened, setNavbarState }: Props) => {
  const logout = useUserStore((store) => store.logout);
  const queryClient = useQueryClient();
  const { classes } = useStyles();

  const links = navigationLinks.map((item) => (
    <NavLink
      className={({ isActive }) =>
        isActive ? classes.link + ' ' + classes.linkActive : classes.link
      }
      // className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      to={item.link}
      key={item.label}
      onClick={setNavbarState}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(item.label);
      // }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar height="100vh - 60" width={{ sm: 300 }} p="md">
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {/* <NavLink
          to="/my-settings"
          onClick={setNavbarState}
          className={({ isActive }) =>
            isActive ? classes.link + ' ' + classes.linkActive : classes.link
          }
          // className={cx(classes.link, { [classes.linkActive]: 'My Settings' === active })}
        >
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>My Settings</span>
        </NavLink> */}

        <Box
          className={classes.link}
          onClick={() => {
            setNavbarState();
            queryClient.clear();
            logout();
          }}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Box>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
