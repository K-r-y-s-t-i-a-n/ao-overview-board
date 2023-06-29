import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Group,
  Button,
  Box,
  Flex,
  MediaQuery,
  Image,
} from '@mantine/core';
import React, { useState } from 'react';
import { useUserStore } from '../../app/store';
import logo from '../../assets/logo.png';
import img from '../../assets/guest_img.jpg';
import api from '../../app/api/axios';

const Login = () => {
  const getUserAfterLogin = useUserStore((state) => state.getUserAfterLogin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/login', { email, password });
      getUserAfterLogin();
    } catch (e) {
      console.log('LOGIN ERROR: ', e);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        paddingTop: '24px',
        background: '#eee',
      }}
    >
      <Container my={80}>
        {/* <img src={logo} alt="" height={40} style={{ marginTop: '2px' }} />
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `${theme.fontFamily}`,
              fontWeight: 900,
            })}
            variant="gradient"
            gradient={{ from: '#009d56', to: 'green', deg: 105 }}
          >
            Overview Board
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Airways Optical Ltd.
          </Text> */}

        <Paper withBorder shadow="md" mt={30} radius="md">
          <Flex direction="row">
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
              <Box sx={{ radius: 'md' }}>
                <Image src={img} height={'500px'} radius="md" />
                {/* <div className="image-wrapper">
                  <img className="image-1" src={img} />
                  <img className="image-2" src={img} />
                  <img className="image-3" src={img} />
                  <img className="image-4" src={img} />
                </div> */}

                {/* -------------------------------------------------------------------- */}
              </Box>
            </MediaQuery>
            <Container my="auto">
              <Flex direction="row" gap={12} justify="center" mb={24} mt="xl">
                <img src={logo} alt="" height={60} />

                <Flex direction="column">
                  <Text
                    mt={4}
                    // variant="gradient"
                    weight={700}
                    size={'xl'}
                    // gradient={{ from: '#009d56', to: 'green', deg: 105 }}
                    color="#016C42"
                  >
                    OVERVIEW BOARD
                  </Text>
                  <Text size="xs" color="dimmed" weight={600}>
                    Airways Optical Ltd
                  </Text>
                </Flex>
              </Flex>
              {/* //* ----------------------- FORM ----------------------*/}
              <form onSubmit={(e) => login(e)}>
                <TextInput
                  label="Username "
                  placeholder="name.surname"
                  required
                  onChange={(e) => setEmail(e.target.value + '@airwaysoptical.co.uk')}
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
                  // variant="gradient"
                  // gradient={{ from: '#009d56', to: 'green', deg: 105 }}
                  color="spec"
                  type="submit"
                  loaderPosition="left"
                  loading={loading}
                  mb="xl"
                >
                  Sign in
                </Button>
              </form>
            </Container>
          </Flex>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
