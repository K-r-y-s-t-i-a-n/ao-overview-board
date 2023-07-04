import { Box, Grid, Stack } from '@mantine/core';
import NoteCreateModal from './NoteCreateModal';
import NotesAside from './NotesAside';
import NotesList from './NotesList';

const Notes = () => {
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

            <NotesList />
          </Stack>
        </Grid.Col>

        {/* ASIDE */}
        <Grid.Col span={3} offset={0.0}>
          <div style={{ position: 'sticky', top: '86px' }}>
            <NotesAside />
          </div>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Notes;
