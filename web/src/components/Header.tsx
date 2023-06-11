import { Box, Text, Flex, MediaQuery } from '@mantine/core';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <Box
      display="flex"
      sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Flex direction="row" gap={8}>
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
              <img src={logo} alt="" height={40} />
            </MediaQuery>

            <Flex direction="column">
              <Text variant="gradient" weight={700} size={'md'}>
                OVERVIEW BOARD
              </Text>
              <Text size="xs" color="dimmed">
                Airways Optical Ltd
              </Text>
            </Flex>
          </Flex>
        </MediaQuery>
      </div>
      <div>Profile</div>
    </Box>
  );
};

export default Header;
