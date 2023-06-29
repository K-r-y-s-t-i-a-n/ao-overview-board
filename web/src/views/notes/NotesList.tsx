import { Group, Badge } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { NotesListItem } from './NotesLIstItem';
import { getNotes } from '../../app/api/notes';
import { useQuery } from '@tanstack/react-query';
import LoadingElement from '../../components/core/LoadingElement';
import { getSortedNotes } from '../../app/helpers/getSortedNotes';
import { useNotesStore } from '../../app/store';
import { Note } from '../../app/interfaces';
import NothingFound from '../../components/core/NothingFound';

const NotesList = () => {
  const selectedTagId = useNotesStore((store) => store.selectedTagId);
  const selectedTeamId = useNotesStore((store) => store.selectedTeamId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sortedNotes, setSortedNoted] = useState<[string, any][] | undefined>(undefined);

  // const { status, error, data }: UseQueryResult<Note[], Error> = useQuery<Note[], Error>({
  const notesQuery = useQuery({
    queryKey: ['notes', selectedTeamId, selectedTagId],
    // keepPreviousData: true,
    queryFn: () => getNotes(selectedTeamId, selectedTagId),
    refetchInterval: 6000,
  });

  // const notesQueryParams = useQuery({
  //   queryKey: ['notes', selectedTeamId, selectedTagId],
  //   keepPreviousData: true,
  //   queryFn: () => getNotes(selectedTeamId, selectedTagId),
  // });

  useEffect(() => {
    if (notesQuery.data) {
      setSortedNoted(getSortedNotes(notesQuery.data as Note[]));
    }
  }, [notesQuery.data]);

  // if (notesQuery.isError)
  //   return (
  //     <>
  //       <h3>Oops, something went wrong.</h3>
  //       <p>{notesQuery.error.toString()}</p>
  //     </>
  //   );

  if (sortedNotes && sortedNotes.length === 0) {
    return <NothingFound />;
  }

  if (notesQuery.isLoading) {
    return <LoadingElement text="Loading notes..." />;
  }

  return (
    <>
      {/* {notesQueryParams.isLoading && <LoadingElement />} */}
      {sortedNotes &&
        // [...sortedNotes].reverse().map(([group, notes]) => (
        [...sortedNotes].reverse().map(([group, notes]) => (
          <Fragment key={group}>
            <Group position="left">
              <Badge
                ml="4"
                size="lg"
                mb="4"
                // variant="dot"
                variant="light"
                color="red"
                radius="md"
                // bg="gray"
                // bg={'#eaeaea'}
                // sx={{ color: 'white' }}
              >
                {group}
              </Badge>
            </Group>

            {[...notes].reverse().map((note) => (
              <NotesListItem key={note.id} note={note} />
            ))}
          </Fragment>
        ))}
    </>
  );
};

export default NotesList;
