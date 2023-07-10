import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, Text, SimpleGrid, TextInput } from '@mantine/core';
import { IconNewSection } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { ModalTitle } from '../../components/core';
// import { LoadingElement } from '../../../components/core';

// type FormProps = {
//   text: string;
//   tags: string[];
// };

const NewActionModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  // const queryCache = useQueryClient();
  // const isLoading = false;

  // const mutation = useMutation({
  //   mutationFn: (newNote: FormProps) => {
  //     return api.post<Note>('/notes', newNote);
  //   },
  //   onSuccess: (res) => {
  //     try {
  //       queryCache.setQueryData([queryKeys.notes, '', '', 1], (notes?: notesDto) => {
  //         if (notes) {
  //           notes.data = [res.data, ...(notes?.data || [])];
  //         }
  //         return notes || undefined;
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }

  //     resetFilters();
  //     queryCache.invalidateQueries();
  //     close();
  //     form.reset();
  //   },
  // });

  const form = useForm({
    initialValues: {
      asset: '',
      issue: '',
      status: '',
    },

    validate: {
      asset: (value) =>
        value.length < 2 ? 'Asset needs to be at least 2 characters long' : null,
      issue: (value) =>
        value.length < 8 ? 'Issue needs to be at least 8 characters long' : null,
      status: (value) => (value.length < 2 ? 'Status is required.' : null),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="New Action" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        <form
          onSubmit={form.onSubmit(() => {
            // createUser();
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
              variant="filled"
              placeholder="Asset name"
              label="Asset"
              withAsterisk
              {...form.getInputProps('asset')}
            />

            <TextInput
              variant="filled"
              placeholder="Short issue description"
              label="Issue"
              withAsterisk
              {...form.getInputProps('issue')}
            />

            <TextInput
              variant="filled"
              placeholder="Status"
              label="Status"
              withAsterisk
              {...form.getInputProps('status')}
            />

            <TextInput
              variant="filled"
              placeholder="Current action step"
              label="Action"
              withAsterisk
              {...form.getInputProps('step')}
            />
            {/* 
              <NativeSelect
                withAsterisk
                data={roles}
                onChange={(e) => {
                  setUsersRoleError('');
                  setUsersRole(e.target.value);
                }}
                label="Role"
                error={usersRoleError}
              /> */}

            {/* <NativeSelect
                data={teams}
                onChange={(e) => {
                  setUsersTeamError('');
                  setUsersTeam(e.target.value);
                }}
                withAsterisk
                label="Team"
                error={usersTeamError}
              /> */}

            {/* <NativeSelect
                withAsterisk
                data={positions || [{ value: '', label: '' }]}
                onChange={(e) => {
                  setUsersPositionError('');
                  setUsersPosition(e.target.value);
                }}
                label="Position"
                error={usersPositionError}
              /> */}
          </SimpleGrid>
          <Group mt="sm" position="right">
            <Button
              variant="white"
              // color="spec"
              onClick={() => {
                close();
                form.reset();
                // setModalOpen(false);
                // setSelectedImages([]);
              }}
              // disabled={mutation.isLoading}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open} size="sm" fullWidth variant="light" mb={16}>
          <IconNewSection /> <Text ml={6}>NEW ACTION</Text>
        </Button>
      </Group>
    </>
  );
};

export default NewActionModal;
