import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, Text, SimpleGrid, TextInput, Badge } from '@mantine/core';
import { IconNewSection } from '@tabler/icons-react';
import { UseFormReturnType, useForm } from '@mantine/form';
import { LoadingElement, ModalTitle, Notification } from '../../../components/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { queryKeys } from '../../../app/api';
import { api } from '../../../app/api/axios';
import { Team } from '../../../app/interfaces';
import { AxiosError } from 'axios';
import { useTeams } from '../../../app/api/hooks/useTeams';
import { Color } from '../../../app/interfaces/color.interface';

type FormProps = {
  name: string;
  color: string;
};

async function getColors() {
  return await api.get<Color[]>('/colors').then((res) => res.data);
}

const NewTeamModal = () => {
  const queryCache = useQueryClient();
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedColor, setSelectedColor] = useState<Color>();

  const teamsQuery = useTeams();

  const colorsQuery = useQuery({
    queryKey: [queryKeys.colors],
    queryFn: getColors,
  });

  const teamExists = (value: string): boolean => {
    const teamNames = teamsQuery.data.map((t) => t.name.toLowerCase());
    if (teamNames.includes(value.toLowerCase())) return true;
    return false;
  };

  const form: UseFormReturnType<FormProps> = useForm({
    initialValues: {
      name: '',
      color: '',
    },

    validate: {
      name: (value) =>
        value.length < 2
          ? 'Team must be at least 2 characters.'
          : teamExists(value)
          ? 'Team with this name already exists.'
          : null,
      color: () => (!selectedColor ? 'You must select a colour for the team.' : null),
    },
  });

  const mutation = useMutation({
    mutationFn: (inForm: FormProps) => {
      const newTeam = { name: inForm.name, color: selectedColor?.id || '' };
      return api.post('/teams', newTeam);
    },
    onSuccess: (res) => {
      try {
        queryCache.setQueryData([queryKeys.teams], (teams?: Team[]) => {
          if (teams) {
            teams = [res.data, ...(teams || [])];
          }
          return teams || undefined;
        });
      } catch (e) {
        console.log(e);
      }
      queryCache.invalidateQueries([queryKeys.teams]);
      close();
      setSelectedColor(undefined);
      form.reset();
      Notification({
        color: 'green',
        message: `Team has been created`,
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not create team. ${err.response?.data.message || err.message}`,
        });
      }
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="New Team" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        {teamsQuery.isLoading ||
        teamsQuery.isLoading ||
        colorsQuery.isLoading ||
        !colorsQuery.data ? (
          <LoadingElement />
        ) : (
          <form
            onSubmit={form.onSubmit((values) => {
              mutation.mutate(values);
            })}
          >
            <SimpleGrid>
              <TextInput
                {...form.getInputProps('name')}
                disabled={mutation.isLoading}
                variant="filled"
                placeholder="Team name"
                label="Team name"
                withAsterisk
                autoComplete="off"
              />
              <TextInput
                {...form.getInputProps('color')}
                value={selectedColor?.color_name || ''}
                disabled={mutation.isLoading}
                variant="filled"
                placeholder="Click on a tag to select colour"
                label="Selected colour"
                withAsterisk
                autoComplete="off"
              />

              <Group>
                {colorsQuery.data.map((color) => (
                  <Badge
                    key={color.color_name + 'newteam'}
                    color={color.color_name}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    onClick={() => {
                      setSelectedColor(color);
                      form.clearFieldError('color');
                    }}
                  >
                    {form.values.name || color.color_name}
                  </Badge>
                ))}
              </Group>
            </SimpleGrid>

            <Group mt="sm" position="right">
              <Button
                variant="white"
                // color="spec"
                onClick={() => {
                  close();
                  setSelectedColor(undefined);
                  form.reset();
                }}
                disabled={mutation.isLoading}
              >
                Cancel
              </Button>

              <Button type="submit" loading={mutation.isLoading}>
                Save
              </Button>
            </Group>
          </form>
        )}
      </Modal>

      <Group position="center">
        <Button onClick={open} size="sm" fullWidth variant="light" mb={16}>
          <IconNewSection /> <Text ml={6}>NEW TEAM</Text>
        </Button>
      </Group>
    </>
  );
};

export default NewTeamModal;
