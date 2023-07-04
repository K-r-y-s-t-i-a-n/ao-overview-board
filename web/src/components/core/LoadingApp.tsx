import { Box, Center, Loader } from '@mantine/core';
import { useUserStore } from '../../app/store';

const LoadingApp = () => {
  const isLoggingOut = useUserStore((state) => state.isLoggingOut);
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Center>
          <Loader variant="dots" size="xl" color="green" />
        </Center>
        <h4>{isLoggingOut ? 'Logging out...' : 'Loading application...'}</h4>
      </Box>
    </Box>
  );
};

export default LoadingApp;
