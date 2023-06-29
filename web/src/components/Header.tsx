import { Box, Text, Flex, MediaQuery } from '@mantine/core';
import logo from '../assets/logo.png';
import HeaderUserInfo from './HeaderUserInfo';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const { pathname } = useLocation();
  const [pageName, setPageName] = useState('');

  console.log('LOCATION: ', pathname);

  useEffect(() => {
    switch (pathname) {
      case '/':
        return setPageName('Communication Notes');
      case '/open-actions':
        return setPageName('Open Actions');
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
                gradient={{ from: '#009d56', to: 'green', deg: 105 }}
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

      <Text size="lg" weight={600}>
        {pageName}
      </Text>

      <HeaderUserInfo />
    </Box>
  );
};

export default Header;
