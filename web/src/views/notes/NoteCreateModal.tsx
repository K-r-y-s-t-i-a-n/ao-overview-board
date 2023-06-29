import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, Text, MultiSelect, Textarea } from '@mantine/core';
import { IconNewSection } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../app/api/axios';
import { useForm } from '@mantine/form';
import { Note } from '../../app/interfaces';
import { queryClient } from '../../app/api/queryClient';

type FormProps = {
  text: string;
  tags: string[];
};

const NoteCreateModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const mobileScreen = useMediaQuery('(max-width: 48em)');

  const mutation = useMutation({
    mutationFn: (newNote: FormProps) => {
      return api.post<Note>('/notes', newNote);
    },
    onSuccess: (res) => {
      // queryClient.setQueryData(['notes'], cachedNotes: any => {
      // console.log(cachedNotes);
      // });
      // queryClient.invalidateQueries(['notes']);
      // queryClient.setQueryData(['notes', null, null], oldaData =>  oldaData ? [...oldaData, res.data] :};
      // queryClient.setQueryData(
      //   ['notes'],
      //   // ✅ this is the way
      //   (oldData) =>
      //     oldData
      //       ? {
      //           ...oldData,
      //           data.data,
      //         }
      //       : oldData
      // );
      //! Sprobowac ustawic set
      close();
      form.reset();
    },
  });

  const form = useForm({
    initialValues: {
      text: '',
      tags: [],
    },

    validate: {
      tags: (value) => (value.length < 1 ? 'At least 1 tag is required' : null),
      text: (value) =>
        value.trim().length < 10 ? 'Note has to be at least 10 letters long' : null,
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<h3>New note</h3>}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
          <MultiSelect
            {...form.getInputProps('tags')}
            withAsterisk
            data={[
              { label: 'OAB 1', value: '1' },
              { label: 'OAB 2', value: '2' },
            ]}
            label="Pick tags"
            placeholder="Choose tags..."
            searchable
            nothingFound="No corresponding tags found, choose “Other“ or speak to Maintenance Manager to add more..."
            mb={12}
            clearable
            disabled={mutation.isLoading}
          />

          <Textarea
            {...form.getInputProps('text')}
            variant="filled"
            label="Note"
            withAsterisk
            autosize
            minRows={10}
            id="text"
            placeholder="Type your note here..."
            mb={12}
            disabled={mutation.isLoading}
          />

          <Group mt="lg" position="right">
            <Button
              variant="outline"
              color="spec"
              onClick={() => {
                close();
                form.reset();
                // setModalOpen(false);
                // setSelectedImages([]);
              }}
              disabled={mutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              // sx={{
              //   backgroundColor: theme.colorScheme === 'dark' ? '#0F462A' : '',
              // }}
              type="submit"
              color="spec"
              loading={mutation.isLoading}
            >
              Add
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open} size="sm" fullWidth variant="light">
          <IconNewSection /> <Text ml={6}>ADD NOTE</Text>
        </Button>
      </Group>
    </>
  );
};

export default NoteCreateModal;
