import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // await axiosClient.get('/sanctum/csrf-cookie');
    try {
      await axiosClient.post('/login', { email, password });
    } catch (e) {
      console.log('LOGIN ERROR: ', e);
    }
    try {
      const user = await axiosClient.get('/user');
      setUser(user);
      console.log(user);
    } catch (e) {
      console.log('GET USER ERROR: ', e);
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.background[1] : '#F7FAFC',
          },
        })}
      >
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `${theme.fontFamily}`,
              fontWeight: 900,
            })}
            variant="gradient"
          >
            Overview Board
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Airways Optical Ltd.
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {/* //* ----------------------- FORM ----------------------*/}
            <form onSubmit={(e) => login(e)}>
              <TextInput
                label="Username "
                placeholder="name.surname"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Group position="right" mt="lg">
                {/* <Checkbox label="Remember me" sx={{ lineHeight: 1 }} /> */}
                <Anchor<'a'>
                  onClick={(event) => event.preventDefault()}
                  href="#"
                  size="xs"
                >
                  Forgot password?
                </Anchor>
              </Group>

              <Button
                fullWidth
                mt="xl"
                variant="gradient"
                type="submit"
                loaderPosition="left"
                loading={loading}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
      <Paper>{JSON.stringify(user, undefined, 2)}</Paper>
    </>
  );
};

export default Login;
