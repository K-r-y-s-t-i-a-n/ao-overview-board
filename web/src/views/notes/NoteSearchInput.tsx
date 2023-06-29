import {
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  MultiSelect,
  Group,
  Button,
  Text,
} from '@mantine/core';
// import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
// import { useStore } from 'app/stores/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  setParams: (key: string, value: string, key2?: string, value2?: string) => void;
}

const NoteSearchInput = () => {
  const theme = useMantineTheme();
  // let navigate = useNavigate();

  // const { tagStore, communicationNoteStore } = useStore();
  // const { loadTags, tags } = tagStore;
  // const { isSearching } = communicationNoteStore;
  // useEffect(() => {
  //   loadTags();
  // }, [loadTags]);

  // const availableTags = tags.map((tag) => ({ value: tag.id, label: tag.name }));

  const sm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  // const form = useForm({
  //   initialValues: {
  //     tags: [],
  //   },
  // });

  const search = (values: { tags: string[] }) => {
    let path = '';
    values.tags.forEach((v) => {
      path += v + ',';
    });
    if (path.length > 1) {
      path = path.substring(0, path.length - 1);
    }
    if (path.length >= 16) {
      // setParams('tags', path, 'page', '1');
      // communicationNoteStore.loadCommunicationNotes(
      //   undefined,
      //   undefined,
      //   path,
      //   null,
      //   true
      // );
      // navigate(`/?tags=${path}`);
    } else {
      // communicationNoteStore.loadCommunicationNotes(
      //   undefined,
      //   undefined,
      //   undefined,
      //   null,
      //   true
      // );
      // navigate('/');
      // setParams('tags', '', 'page', '');
    }
  };

  return (
    <form
    // onSubmit={form.onSubmit((values) => search(values))}
    >
      <Group>
        <MultiSelect
          // {...form.getInputProps('tags')}
          data={['P15']}
          icon={<IconSearch size={18} stroke={1.5} />}
          searchable
          clearable
          nothingFound="No tags found"
          radius="md"
          size="sm"
          placeholder="Search by tag"
          rightSectionWidth={42}
          // miw={sm ? '80%' : 400}
          // maw={sm ? '80%' : 400}
        />

        <Button
          radius="md"
          color={theme.primaryColor}
          variant="outline"
          type="submit"
          size="sm"
          // loading={isSearching}
          // loading={communicationNoteStore.isSearching}
          // leftIcon={<IconSearch size={18} stroke={2.5} />}
        >
          <IconSearch size={18} stroke={2.5} />
          <Text ml={6}>Search</Text>
        </Button>
      </Group>
    </form>
  );
};

export default NoteSearchInput;
