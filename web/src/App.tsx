import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import router from './app/router';
import { RouterProvider } from 'react-router-dom';
import { theme } from './app/theme';
import { ModalsProvider } from '@mantine/modals';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useUserStore } from './app/store';
import Login from './views/login';
import { useEffect } from 'react';
import LoadingApp from './components/core/LoadingApp';
import { queryClient } from './app/api/queryClient';

function App() {
  const isAppLoading = useUserStore((state) => state.isLoading);
  const user = useUserStore((state) => state.data);
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <Notifications />
          <ModalsProvider>
            {isAppLoading ? (
              <LoadingApp />
            ) : user ? (
              <RouterProvider router={router} />
            ) : (
              <Login />
            )}
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
