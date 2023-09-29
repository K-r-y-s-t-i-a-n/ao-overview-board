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
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTagsByCategory, useTags } from '../../../app/api/hooks/useTags';
import { LoadingElement, ModalTitle, Notification } from '../../../components/core';
import { api, queryKeys } from '../../../app/api';
import { Tag } from '../../../app/interfaces';
import { useCategories } from '../../../app/api/hooks/useCategories';
import { AxiosError } from 'axios';
// import { LoadingElement } from '../../../components/core';

type FormProps = {
  name: string;
  category: string;
};

const NewTagModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { tags, isLoading: isLoadingTags } = useTags();
  const { selectCategories, isLoading: isLoadingCategories } = useCategories();
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const queryCache = useQueryClient();
  // const isLoading = false;

  const tagsByCategoryQuery = useQuery({
    queryKey: [queryKeys.tagsByCategory],
    queryFn: getTagsByCategory,
  });

  const mutation = useMutation({
    mutationFn: (newTag: FormProps) => {
      return api.post<Tag>('/tags', newTag);
    },
    onSuccess: (res) => {
      try {
        queryCache.setQueryData([queryKeys.tags], (tags?: Tag[]) => {
          if (tags) {
            tags = [res.data, ...(tags || [])];
          }
          return tags || undefined;
        });
      } catch (e) {
        console.log(e);
      }
      queryCache.invalidateQueries([queryKeys.tags, queryKeys.tagsByCategory]);
      tagsByCategoryQuery.refetch();
      close();
      form.reset();
      Notification({ message: 'Tag has been created.' });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return Notification({
          error: true,
          message: err.response?.data.message,
        });
      }
    },
  });

  const tagExists = (value: string): boolean => {
    if (tags) {
      const tagExists = tags.map((t) => t.name.toLowerCase());
      if (tagExists.includes(value.toLowerCase())) return true;
    }
    return false;
  };

  const form = useForm({
    initialValues: {
      category: '',
      name: '',
    },

    validate: {
      name: (value) =>
        value.length < 2
          ? 'The tag must be at least 2 characters.'
          : value.length > 255
          ? 'Maximum 255 characters.'
          : tagExists(value)
          ? 'The tag already exists.'
          : null,
      category: (value) => (value === '' ? 'Category is required.' : null),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="New Tag" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        {isLoadingTags || isLoadingCategories ? (
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
              <TextInput
                {...form.getInputProps('name')}
                disabled={mutation.isLoading}
                variant="filled"
                placeholder="Tag name"
                label="Tag"
                withAsterisk
              />
              <NativeSelect
                {...form.getInputProps('category')}
                disabled={mutation.isLoading}
                withAsterisk
                variant="filled"
                data={[{ value: '', label: 'Choose category' }, ...selectCategories]}
                label="Category"
                placeholder="Choose category"
                mb={12}
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

      <Button onClick={open} size="sm" fullWidth variant="light" mb={16}>
        <IconNewSection /> <Text ml={6}>NEW TAG</Text>
      </Button>
    </>
  );
};

export default NewTagModal;
