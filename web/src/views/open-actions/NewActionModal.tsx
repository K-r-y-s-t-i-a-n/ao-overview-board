import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, Text, SimpleGrid, Textarea, Select } from '@mantine/core';
import { IconNewSection } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { LoadingElement, ModalTitle, Notification } from '../../components/core';
import { api, queryKeys } from '../../app/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Action } from '../../app/interfaces';
import { useTags } from '../../app/api/hooks/useTags';
// import { LoadingElement } from '../../../components/core';

type FormProps = {
  asset: string | null;
  status: 'Stopped' | 'RWI' | 'Testing' | 'Other';
  issue: string;
  step: string;
};

const NewActionModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { selectTags, isLoading } = useTags();
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const queryCache = useQueryClient();
  // const isLoading = false;

  const mutation = useMutation({
    mutationFn: (newAction: FormProps) => {
      return api.post<Action>('/actions', newAction);
    },
    onSuccess: (res) => {
      try {
        queryCache.setQueryData([queryKeys.actions], (actions?: Action[]) => {
          if (actions) {
            actions = [res.data, ...(actions || [])];
          }
          return actions || undefined;
        });
      } catch (e) {
        console.log(e);
      }
      queryCache.invalidateQueries([queryKeys.actions]);
      close();
      form.reset();
      Notification({ message: 'Action has been created.' });
    },
  });

  const form = useForm({
    initialValues: {
      asset: null,
      status: '',
      issue: '',
      step: '',
    },

    validate: {
      asset: (value) => (value === null ? 'Asset is required' : null),
      issue: (value) =>
        value.length < 5
          ? 'Issue needs to be at least 5 characters long'
          : value.length > 255
          ? 'Maximum 255 characters.'
          : null,
      step: (value) =>
        value.length < 5
          ? 'Action needs to be at least 5 characters long'
          : value.length > 1000
          ? 'Maximum 1000 characters.'
          : null,
      status: (value) =>
        value !== 'Stopped' && value !== 'RWI' && value !== 'Testing' && value !== 'Other'
          ? 'Choose status.'
          : null,
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
        {isLoading ? (
          <LoadingElement />
        ) : (
          <form
            onSubmit={form.onSubmit((values) => {
              mutation.mutate(values as FormProps);
            })}
          >
            <SimpleGrid
              cols={2}
              breakpoints={[
                { maxWidth: 'sm', cols: 1 },
                { maxWidth: 'md', cols: 1 },
                { maxWidth: 'xl', cols: 2 },
              ]}
              mb={'1rem'}
            >
              {/* <TextInput
              variant="filled"
              placeholder="Asset name"
              label="Asset"
              withAsterisk
              disabled={mutation.isLoading}
              {...form.getInputProps('asset')}
            /> */}

              <Select
                {...form.getInputProps('asset')}
                withAsterisk
                variant="filled"
                data={selectTags}
                label="Asset"
                placeholder="Choose tag"
                searchable
                nothingFound="No corresponding tags found, choose “Other“ or speak to Maintenance Manager to add more..."
                mb={12}
                clearable
                disabled={mutation.isLoading}
              />
              <Select
                variant="filled"
                placeholder="Status"
                label="Status"
                withAsterisk
                data={['Stopped', 'RWI', 'Testing', 'Other']}
                disabled={mutation.isLoading}
                {...form.getInputProps('status')}
              />
            </SimpleGrid>

            <SimpleGrid>
              <Textarea
                variant="filled"
                placeholder="Short issue description"
                label="Issue"
                withAsterisk
                autosize
                minRows={1}
                maxRows={2}
                disabled={mutation.isLoading}
                {...form.getInputProps('issue')}
              />

              <Textarea
                variant="filled"
                placeholder="Current action step"
                label="Action"
                withAsterisk
                autosize
                minRows={1}
                maxRows={4}
                disabled={mutation.isLoading}
                {...form.getInputProps('step')}
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
              <Button type="submit" loading={mutation.isLoading}>
                Save
              </Button>
            </Group>
          </form>
        )}
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
