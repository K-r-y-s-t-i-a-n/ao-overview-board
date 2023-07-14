import { Box, Text, Flex, MediaQuery } from '@mantine/core';
import logo from '../assets/logo.png';
// import logo from '../assets/logo_dark.png';
import HeaderUserInfo from './HeaderUserInfo';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const Header = () => {
  const { pathname } = useLocation();
  const [pageName, setPageName] = useState('');
  const smallScreen = useMediaQuery('(max-width: 60em)');

  useEffect(() => {
    switch (pathname) {
      case '/':
        return setPageName('Communication Notes');
      case '/open-actions':
        return setPageName('Open Actions');
      case '/deleted-actions':
        return setPageName('Deleted Actions');
      case '/my-settings':
        return setPageName('My Settings');
      case '/manage-users':
        return setPageName('Manage Users');
      default:
        return setPageName('');
    }
  }, [pathname]);

  return (
    <Box
      display="flex"
      sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Box>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Flex direction="row" gap={8}>
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
              <img src={logo} alt="" height={40} style={{ marginTop: '2px' }} />
            </MediaQuery>

            <Flex direction="column">
              <Text
                variant="gradient"
                weight={700}
                size={'md'}
                // gradient={{ from: '#009d56', to: 'green', deg: 105 }}
                // gradient={{ from: '#0d3f61', to: 'green', deg: 105 }}
                // gradient={{ from: '#0f462e', to: '#0d3f61', deg: 105 }}
                // gradient={{ from: '#0f462e', to: '#009D56', deg: 105 }}
                gradient={{ from: '#009D56', to: '#1aa96b', deg: 105 }}
              >
                OVERVIEW BOARD
              </Text>
              <Text size="xs" color="dimmed">
                Airways Optical Ltd
              </Text>
            </Flex>
          </Flex>
        </MediaQuery>
      </Box>

      <Text size={smallScreen ? 'md' : 'lg'} weight={600}>
        {pageName}
      </Text>

      <HeaderUserInfo />
    </Box>
  );
};

export default Header;
