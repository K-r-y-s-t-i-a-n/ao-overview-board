import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, SimpleGrid, TextInput, NativeSelect } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { UseFormReturnType, useForm } from '@mantine/form';
import { LoadingElement, ModalTitle } from '../../../components/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { queryKeys } from '../../../app/api';
import { getRoles, getTeams } from '../../../app/api/axios';
import { api } from '../../../app/api/axios';
import { Employee } from '../../../app/interfaces';

type FormProps = {
  first_name: string;
  last_name: string;
};

interface Props {
  id: string;
  employee: Employee;
}

// COMPONENT
const EditUserModal = ({ id, employee }: Props) => {
  const queryCache = useQueryClient();
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const [opened, { open, close }] = useDisclosure(false);
  const [teams, setTeams] = useState<{ value: string; label: string }[]>([]);
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [formRoleId, setFormRoleId] = useState(employee.role.id || '');
  const [formTeamId, setFormTeamId] = useState(employee.team.id || '');

  // MUTATION - PUT REQUEST
  const mutation = useMutation({
    mutationFn: (userData: FormProps) => {
      const editedUser = {
        ...userData,
        email: (
          userData.first_name +
          '.' +
          userData.last_name +
          '@airwaysoptical.co.uk'
        ).toLowerCase(),
        role_id: formRoleId,
        team_id: formTeamId,
      };
      return api.put('/admin/employees/' + id, editedUser);
    },
    onSuccess: (res) => {
      try {
        queryCache.setQueryData([queryKeys.employees], (employees?: Employee[]) => {
          if (employees) {
            const index = employees.findIndex((employee) => employee.id === res.data.id);
            if (index !== -1) employees[index] = res.data;
          } else {
            employees = [res.data];
          }
          return employees;
        });
      } catch (e) {
        console.log(e);
      }
      queryCache.invalidateQueries([queryKeys.employees]);
      close();
      form.reset();
    },
  });

  // QUERIES
  const teamsQuery = useQuery({
    queryKey: [queryKeys.teams],
    queryFn: getTeams,
  });

  const rolesQuery = useQuery({
    queryKey: [queryKeys.roles],
    queryFn: getRoles,
  });

  // SET TEAMS
  useEffect(() => {
    if (teamsQuery.data) {
      const c = teamsQuery.data.map((team) => {
        return {
          value: team.id,
          label: team.name,
        };
      });
      if (c) {
        setTeams(c);
      }
    }
  }, [teamsQuery.data]);

  // SET ROLES
  useEffect(() => {
    if (rolesQuery.data) {
      const c = rolesQuery.data.map((role) => {
        return {
          value: role.id,
          label: role.name,
        };
      });
      if (c) {
        setRoles(c);
      }
    }
  }, [rolesQuery.data]);

  // FORM DEFAULTS AND VALIDATION
  const form: UseFormReturnType<FormProps> = useForm({
    initialValues: {
      first_name: employee.first_name,
      last_name: employee.last_name,
    },

    validate: {
      first_name: (value) =>
        value.length < 2 ? 'First name must be at least 2 characters.' : null,
      last_name: (value) =>
        value.length < 2 ? 'Last name must be at least 2 characters.' : null,
    },
  });

  useEffect(() => {
    if (!employee.team.id) {
      setTeams((teams) => [{ value: '', label: 'Choose team' }, ...teams]);
    }
    if (!employee.role.id) {
      setRoles((roles) => [{ value: '', label: 'Choose team' }, ...roles]);
    }
  }, [employee.role.id, employee.team.id]);

  //* =======================    RETURN JSX    ========================
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="Edit User" />}
        size={mobileScreen ? '100%' : 'xl'}
        // sx={{ height: '600px' }}
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

              <NativeSelect
                defaultValue={employee.team.id || ''}
                onChange={(e) => {
                  setFormTeamId(e.target.value);
                }}
                disabled={mutation.isLoading}
                data={teams}
                variant="filled"
                size="sm"
                label="Team"
              />

              <NativeSelect
                defaultValue={employee.role.id || ''}
                onChange={(e) => setFormRoleId(e.target.value)}
                sx={{ zIndex: 1000 }}
                disabled={mutation.isLoading}
                // value={form.values.role_id}
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

      <Button onClick={open} size="xs" variant="light">
        <IconPencil size="1rem" stroke={2.5} />
      </Button>
    </>
  );
};

export default EditUserModal;
