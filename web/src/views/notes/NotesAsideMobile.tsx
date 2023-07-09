import { getTagsByCategory } from '../../app/api/axios/tags';
import { useQuery } from '@tanstack/react-query';
import { LoadingElement } from '../../components/core';
import { Flex, Text, Box, NativeSelect, Button } from '@mantine/core';
import NotesAsideTag from './NotesAsideTag';
import { useNotesStore } from '../../app/store';
import { useEffect, useState } from 'react';
import { getTeams } from '../../app/api/axios/teams';

const NotesAsideMobile = () => {
  // const setSelectedTagId = useNotesStore((store) => store.setSelectedTagId);
  const setSelectedTeamId = useNotesStore((store) => store.setSelectedTeamId);
  const resetFilters = useNotesStore((store) => store.resetFilters);
  const selectedTeamId = useNotesStore((store) => store.selectedTeamId);
  const setCurrentPage = useNotesStore((store) => store.setCurrentPage);
  const [teams, setTeams] = useState<{ value: string; label: string }[]>([]);

  const tagsQuery = useQuery({
    queryKey: ['tagsByCategory'],
    queryFn: getTagsByCategory,
  });

  const categoriesQuery = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  });

  useEffect(() => {
    if (categoriesQuery.data) {
      const c = categoriesQuery.data.map((category) => {
        return {
          value: category.id,
          label: category.name,
        };
      });
      c.unshift({ value: '', label: 'All teams' });
      setTeams(c);
    }
  }, [categoriesQuery.data]);

  if (tagsQuery.isLoading || categoriesQuery.isLoading) {
    return <LoadingElement text="Getting tags..." />;
  }

  return (
    <Flex
      direction="column"
      gap="7px"
      // sx={{
      //   animation: 'slide-left .3s',
      //   overflowY: 'hidden',
      //   overscrollBehaviorY: 'none',
      // }}
    >
      <Button variant="outline" color="gray" onClick={resetFilters}>
        Reset filters
      </Button>
      <NativeSelect
        data={teams}
        variant="filled"
        size="sm"
        onChange={(e) => {
          setSelectedTeamId(e.currentTarget.value);
          setCurrentPage(1);
        }}
        value={selectedTeamId}
      />
      {tagsQuery.data &&
        tagsQuery.data.map((category) => (
          <Box key={'asidecategory' + category.name}>
            <Text weight={600} size={'xs'} color="dark" mt={0}>
              {category.name}
            </Text>

            {category.tags
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tag) => (
                <NotesAsideTag key={'tag' + tag.name} tag={tag} />
              ))}
          </Box>
        ))}

      {/* <NoteSearchInput /> */}
    </Flex>
  );
};

export default NotesAsideMobile;
