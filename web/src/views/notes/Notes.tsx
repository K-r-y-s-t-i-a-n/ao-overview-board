import { Grid, Stack, MediaQuery, Accordion, Alert, Center, Text } from '@mantine/core';
import NoteCreateModal from './NoteCreateModal';
import NotesAside from './NotesAside';
import NotesList from './NotesList';
import NotesAsideMobile from './NotesAsideMobile';
import { useScreenSize } from '../../app/hooks/useScreenSize';
import { IconAlertCircle, IconFilter } from '@tabler/icons-react';
import { useNotesStore } from '../../app/store';
import { useEffect, useState } from 'react';
import { usePermissions } from '../../app/hooks';
import { PERMISSIONS } from '../../app/constants/permissions';
import { ViewWrapper } from '../../components/core';

const Notes = () => {
  const { smMaxScreen } = useScreenSize();
  const selectedTeamId = useNotesStore((store) => store.selectedTeamId);
  const selectedTagId = useNotesStore((store) => store.selectedTagId);
  const [filterText, setFilterText] = useState('');
  const canCreateNote = usePermissions(PERMISSIONS.CREATE_NOTES);

  const getPadding = () => {
    if (smMaxScreen) {
      return { paddingLeft: 0, paddingRight: 0 };
    }
  };

  useEffect(() => {
    if (selectedTagId && selectedTeamId)
      return setFilterText('Team and tag filters applied.');
    if (selectedTagId) return setFilterText('Tag filter applied.');
    if (selectedTeamId) return setFilterText('Team filter applied.');
    setFilterText('');
  }, [selectedTeamId, selectedTagId, canCreateNote]);

  return (
    <ViewWrapper>
      {/* NOTES */}
      <Grid>
        <Grid.Col span="auto" sx={getPadding()}>
          <Stack
            sx={{
              animation: 'slide-up .3s',
              overflowY: 'hidden',
              overscrollBehaviorY: 'none',
            }}
          >
            {/* ADD NOTE MODAL */}
            {canCreateNote && <NoteCreateModal />}

            {/* FILTER NOTIFICATION */}
            {filterText && (
              <Alert
                // icon={<IconAlertCircle size="1rem" />}
                // title="Team filter applied!"
                color="green"
                variant="filled"
              >
                <Center>
                  <IconAlertCircle size="1rem" />{' '}
                  <Text weight={500} ml={10}>
                    {filterText}
                  </Text>
                </Center>
              </Alert>
            )}

            {/* FILTERS MOBILE */}
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

            {/* NOTES */}
            <NotesList />
          </Stack>
        </Grid.Col>

        {/* FULL SCREEN ASIDE */}
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Grid.Col span={3} offset={0.0}>
            <div style={{ position: 'sticky', top: '86px' }}>
              <NotesAside />
            </div>
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </ViewWrapper>
  );
};

export default Notes;
