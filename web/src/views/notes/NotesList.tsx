/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Badge, Pagination } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { NotesListItem } from './NotesLIstItem';
import { LoadingElement, NothingFound } from '../../components/core';
import { useNotes } from '../../app/api/hooks/useNotes';
import { useNotesStore } from '../../app/store';
import { handleScrollToTop } from '../../app/helpers/handleScrollToTop';

const NotesList = () => {
  const { sortedNotes, isLoading } = useNotes();
  const currentPage = useNotesStore((store) => store.currentPage);
  const lastPage = useNotesStore((store) => store.lastPage);
  const setCurrentPage = useNotesStore((store) => store.setCurrentPage);
  const [showNothingFound, setShowNothingFound] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    if (sortedNotes && sortedNotes.length === 0) {
      timeoutId = setTimeout(() => {
        setShowNothingFound(true);
      }, 300);
    } else {
      setShowNothingFound(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(sortedNotes)]);

  if (isLoading) {
    return <LoadingElement text="Loading notes..." />;
  }

  if (showNothingFound) {
    return <NothingFound />;
  }

  // if (sortedNotes && sortedNotes.length === 0) {
  //   return <NothingFound />;
  // }

  return (
    <>
      {/* <Pagination total={lastPage} value={currentPage} onChange={setCurrentPage} /> */}
      {sortedNotes &&
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
      {sortedNotes && lastPage > 1 && sortedNotes.length > 0 && (
        <Pagination
          total={lastPage}
          value={currentPage}
          position="center"
          onChange={(v) => {
            setCurrentPage(v);
            handleScrollToTop();
          }}
        />
      )}
    </>
  );
};

export default NotesList;
