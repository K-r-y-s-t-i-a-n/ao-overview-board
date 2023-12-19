import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, Text, MultiSelect, Textarea } from '@mantine/core';
import { IconNewSection } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../app/api/axios';
import { useForm } from '@mantine/form';
import { Note } from '../../app/interfaces';
import { useTags } from '../../app/api/hooks/useTags';
import { LoadingElement, ModalTitle } from '../../components/core';
import { queryKeys } from '../../app/api';
import { useNotesStore } from '../../app/store';
import { notesDto } from '../../app/api/types/notes.dto';

type FormProps = {
  text: string;
  tags: string[];
};

const NoteCreateModal = () => {
  const resetFilters = useNotesStore((store) => store.resetFilters);
  const { selectTags, isLoading } = useTags();
  const [opened, { open, close }] = useDisclosure(false);
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const queryCache = useQueryClient();

  

  const mutation = useMutation({
    mutationFn: (newNote: FormProps) => {
      return api.post<Note>('/notes', newNote);
    },
    onSuccess: (res) => {
      // try {
      //   queryCache.setQueryData([queryKeys.notes, '', ''], (notes?: Note[]) => {
      //     return [res.data, ...(notes || [])];
      //   });
      // } catch (e) {
      //   console.log('E: ', e);
      // }
      try {
        queryCache.setQueryData([queryKeys.notes, '', '', 1], (notes?: notesDto) => {
          if (notes) {
            notes.data = [res.data, ...(notes?.data || [])];
          }
          return notes || undefined;
        });
      } catch (e) {
        console.log(e);
      }

      resetFilters();
      queryCache.invalidateQueries();
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

  const submitForm = form.onSubmit((values) => mutation.mutate(values));

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitForm()
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="New Note" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        {isLoading ? (
          <LoadingElement />
        ) : (
              
              <form onSubmit={submitForm} >
            <MultiSelect
              {...form.getInputProps('tags')}
              withAsterisk
              data={selectTags}
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
              onKeyDown={handleKeyPress}
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
                variant="white"
                // color="spec"
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
        )}
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
