import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  Modal,
  Button,
  Group,
  Text,
  SimpleGrid,
  TextInput,
  NativeSelect,
} from '@mantine/core';
import { IconNewSection } from '@tabler/icons-react';
import { UseFormReturnType, useForm } from '@mantine/form';
import { LoadingElement, ModalTitle, Notification } from '../../../components/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { queryKeys } from '../../../app/api';
import { getRoles } from '../../../app/api/axios';
import { api } from '../../../app/api/axios';
import { Employee } from '../../../app/interfaces';
import { AxiosError } from 'axios';
import { useTeams } from '../../../app/api/hooks/useTeams';

type FormProps = {
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  role_id: string;
  team_id: string;
};

const NewUserModal = () => {
  const queryCache = useQueryClient();
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const [opened, { open, close }] = useDisclosure(false);
  const [teams, setTeams] = useState<{ value: string; label: string }[]>([]);
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);

  // const teamsQuery = useQuery({
  //   queryKey: [queryKeys.teams],
  //   queryFn: getTeams,
  // });

  const teamsQuery = useTeams();

  const rolesQuery = useQuery({
    queryKey: [queryKeys.roles],
    queryFn: getRoles,
  });

  useEffect(() => {
    if (teamsQuery.data) {
      const c = teamsQuery.data.map((team) => {
        return {
          value: team.id,
          label: team.name,
        };
      });
      c.unshift({ value: '', label: 'Choose team' });
      setTeams(c);
    }
  }, [teamsQuery.data]);

  useEffect(() => {
    if (rolesQuery.data) {
      const c = rolesQuery.data.map((role) => {
        return {
          value: role.id,
          label: role.name,
        };
      });
      c.unshift({ value: '', label: 'Choose role' });
      setRoles(c);
    }
  }, [rolesQuery.data]);

  const form: UseFormReturnType<FormProps> = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      password: '',
      password_confirmation: '',
      role_id: '',
      team_id: '',
    },

    validate: {
      first_name: (value) =>
        value.length < 2 ? 'First name must be at least 2 characters.' : null,
      last_name: (value) =>
        value.length < 2 ? 'Last name must be at least 2 characters.' : null,
      password: (value) =>
        value.length < 8
          ? 'The password must be at least 8 characters.'
          : value !== form.values.password_confirmation
          ? true
          : null,
      password_confirmation: (value) =>
        value !== form.values.password
          ? 'Passwords do not match.'
          : value.length < 8
          ? 'The password must be at least 8 characters.'
          : null,
      role_id: (value) => (value === '' ? 'Role is required.' : null),
      team_id: (value) => (value === '' ? 'Team is required.' : null),
    },
  });

  const mutation = useMutation({
    mutationFn: (userData: FormProps) => {
      const newUser = {
        ...userData,
        email: (
          userData.first_name +
          '.' +
          userData.last_name +
          '@airwaysoptical.co.uk'
        ).toLowerCase(),
      };
      return api.post('/admin/employees', newUser);
    },
    onSuccess: (res) => {
      try {
        queryCache.setQueryData([queryKeys.employees], (employees?: Employee[]) => {
          if (employees) {
            employees = [res.data, ...(employees || [])];
          }
          return employees || undefined;
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      queryCache.invalidateQueries([queryKeys.employees]);
      close();
      form.reset();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not create user. ${err.response?.data.message || err.message}`,
        });
      }
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="New User" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        {rolesQuery.isLoading || teamsQuery.isLoading ? (
          <LoadingElement />
        ) : (
          <form
            onSubmit={form.onSubmit((values) => {
              mutation.mutate(values);
            })}
          >
            <SimpleGrid
              cols={2}
              breakpoints={[
                { maxWidth: 'sm', cols: 1 },
                { maxWidth: 'md', cols: 1 },
                { maxWidth: 'xl', cols: 2 },
              ]}
              // sx={{ animation: 'slide-up .3s' }}
            >
              <TextInput
                {...form.getInputProps('first_name')}
                disabled={mutation.isLoading}
                variant="filled"
                placeholder="First Name"
                label="First Name"
                withAsterisk
                autoComplete="off"
              />

              <TextInput
                {...form.getInputProps('last_name')}
                disabled={mutation.isLoading}
                variant="filled"
                placeholder="Last Name"
                label="Last Name"
                withAsterisk
                autoComplete="off"
              />

              <TextInput
                {...form.getInputProps('password')}
                disabled={mutation.isLoading}
                variant="filled"
                placeholder="Password"
                label="Password"
                type="password"
                withAsterisk
                autoComplete="new-password"
              />

              <TextInput
                {...form.getInputProps('password_confirmation')}
                disabled={mutation.isLoading}
                variant="filled"
                placeholder="Password"
                label="Confirm Password"
                type="password"
                autoComplete="off"
                withAsterisk
              />

              <NativeSelect
                {...form.getInputProps('team_id')}
                disabled={mutation.isLoading}
                data={teams}
                variant="filled"
                size="sm"
                label="Team"
                withAsterisk
              />

              <NativeSelect
                {...form.getInputProps('role_id')}
                disabled={mutation.isLoading}
                data={roles}
                variant="filled"
                placeholder="Role"
                label="Access Role"
                withAsterisk
              />
            </SimpleGrid>
            <Group mt="sm" position="right">
              <Button
                variant="white"
                // color="spec"
                onClick={() => {
                  close();
                  form.reset();
                }}
                disabled={mutation.isLoading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={mutation.isLoading}
                loading={mutation.isLoading}
              >
                Save
              </Button>
            </Group>
          </form>
        )}
      </Modal>

      <Group position="center">
        <Button onClick={open} size="sm" fullWidth variant="light" mb={16}>
          <IconNewSection /> <Text ml={6}>NEW USER</Text>
        </Button>
      </Group>
    </>
  );
};

export default NewUserModal;
