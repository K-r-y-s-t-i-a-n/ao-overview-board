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
import { useState } from 'react';
import { useUserStore } from '../../app/store';
import logo from '../../assets/logo.png';
import img from '../../assets/guest_img.jpg';
import api from '../../app/api/axios/axios';
import { AxiosError } from 'axios';
import { useForm } from '@mantine/form';
import { Notification } from '../../components/core';

interface FormProps {
  email: string;
  password: string;
}

const Login = () => {
  const getUserAfterLogin = useUserStore((state) => state.getUserAfterLogin);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      pass: '',
    },
    transformValues: (values) => ({
      email: `${values.name}@airwaysoptical.co.uk`,
      password: values.pass,
    }),
  });

  const login = async (loginData: FormProps) => {
    setLoading(true);
    try {
      await api.post('/login', loginData);
      getUserAfterLogin();
      form.reset();
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 422) {
          setLoading(false);
          form.setErrors({ pass: 'Invalid credentials.', name: true });
          return;
        }
        Notification({ error: true, message: 'Something went wrong. Please try again.' });
        form.reset();
      }
    }
    form.reset();
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
              <form onSubmit={form.onSubmit((v) => login(v))}>
                <TextInput
                  label="Username "
                  placeholder="name.surname"
                  disabled={loading}
                  required
                  {...form.getInputProps('name')}
                />
                <PasswordInput
                  label="Password"
                  disabled={loading}
                  placeholder="Your password"
                  required
                  mt="md"
                  {...form.getInputProps('pass')}
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
