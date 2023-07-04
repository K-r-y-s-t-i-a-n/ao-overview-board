import { Card, Group, Text, Badge, Box, Image } from '@mantine/core';
// import { getTeamColor } from 'app/helpers';
import { format } from 'date-fns';
import AppCard from '../../components/core/AppCard';
import { Note } from '../../app/interfaces';
import { useNotesStore } from '../../app/store';
import { handleScrollToTop } from '../../app/helpers/handleScrollToTop';

interface Props {
  note: Note;
  // setParams: (key: string, value: string, key2?: string, value2?: string) => void;
}

// export const NotesListItem = ({ data, setParams }: Props) => {
export const NotesListItem = ({ note }: Props) => {
  const setSelectedTagId = useNotesStore((store) => store.setSelectedTagId);
  const setSelectedTeamId = useNotesStore((store) => store.setSelectedTeamId);
  const setCurrentPage = useNotesStore((store) => store.setCurrentPage);

  return (
    <AppCard mb={12}>
      <Card.Section
        inheritPadding
        py="xs"
        // bg={'#eef9ed'}
      >
        <Group position="apart">
          <Group position="left" spacing="xs">
            {note.tags &&
              note.tags.map((tag) => (
                <Badge
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                  key={note.id + tag.name}
                  color="red"
                  variant="dot"
                  onClick={() => {
                    setSelectedTagId(tag.id);
                    setCurrentPage(1);
                    handleScrollToTop();
                  }}
                >
                  {tag.name}
                </Badge>
              ))}
          </Group>
          {note.team && (
            <Badge
              sx={{ '&:hover': { cursor: 'pointer' } }}
              color={note.team.color}
              variant="light"
              onClick={() => {
                setSelectedTeamId(note.team?.id);
                setCurrentPage(1);
                handleScrollToTop();
              }}
            >
              {note.team.name}
            </Badge>
          )}
        </Group>
      </Card.Section>

      {/* MIDDLE ROW TEXT */}
      <Card.Section
        px="xs"
        mb="xs"
        // mt="xs"
      >
        <Text mx="xs" size="sm" weight="500">
          {note.text}
        </Text>
      </Card.Section>

      {/* BOTTOM ROW */}
      <Card.Section py="xs" px="xs" bg={'#f4f6fa'}>
        <Group position="apart" spacing="xs">
          <Text mx="xs" color="dimmed" size="xs" weight={600}>
            {note.added_by}
          </Text>
          <Text mx="xs" color="dimmed" size="xs">
            <Badge
              color="gray"
              //  bg="#f4f6fa"
            >
              {format(new Date(note.updated_at), 'HH:mm')}
            </Badge>
          </Text>
        </Group>
      </Card.Section>

      {/* <Card.Section pb="xs" px="xs">
        <Group position="left" spacing="xs">
          <Box maw={60}>
            <Image
              withPlaceholder
              radius="md"
              src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
              alt="image"
              sx={{
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box maw={60}>
            <Image
              withPlaceholder
              radius="md"
              src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
              alt="image"
            />
          </Box>
          <Box maw={60}>
            <Image
              withPlaceholder
              radius="md"
              src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
              alt="image"
            />
          </Box>
        </Group>
      </Card.Section> */}
    </AppCard>
  );
};
