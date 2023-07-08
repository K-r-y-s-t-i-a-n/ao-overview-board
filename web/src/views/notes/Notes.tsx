import { Box, Grid, Stack, MediaQuery, Accordion } from '@mantine/core';
import NoteCreateModal from './NoteCreateModal';
import NotesAside from './NotesAside';
import NotesList from './NotesList';
import NotesAsideMobile from './NotesAsideMobile';
import { useScreenSize } from '../../app/hooks/useScreenSize';
import { IconFilter } from '@tabler/icons-react';

const Notes = () => {
  const { smMaxScreen } = useScreenSize();
  return (
    <Box sx={{ maxWidth: '1600px', marginLeft: 'auto', marginRight: 'auto' }}>
      {/* NOTES */}
      <Grid>
        <Grid.Col span="auto">
          <Stack
            sx={{
              animation: 'slide-up .3s',
              overflowY: 'hidden',
              overscrollBehaviorY: 'none',
            }}
          >
            <NoteCreateModal />

            {smMaxScreen && (
              <Accordion variant="default">
                <Accordion.Item value="filters">
                  <Accordion.Control icon={<IconFilter size={20} color="green" />}>
                    Filters
                  </Accordion.Control>
                  <Accordion.Panel>
                    <NotesAsideMobile />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            )}

            <NotesList />
          </Stack>
        </Grid.Col>

        {/* ASIDE */}
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Grid.Col span={3} offset={0.0}>
            <div style={{ position: 'sticky', top: '86px' }}>
              <NotesAside />
            </div>
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </Box>
  );
};

export default Notes;
