import { ActionIcon, Alert, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconAlertCircle, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '../../../app/api';
import { Team } from '../../../app/interfaces';
import { Notification } from '../../../components/core';
import { AxiosError } from 'axios';

interface Props {
  team: Team;
}

const ConfirmTeamDelete = ({ team }: Props) => {
  const queryCache = useQueryClient();

  const deleteEmployee = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/teams/${id}`);
    },
    onSuccess: (res) => {
      queryCache.setQueryData([queryKeys.teams], (teams?: Team[]) => {
        if (teams) {
          const filteredTeams = teams.filter((obj) => obj.id != res.data.id);
          return filteredTeams || undefined;
        }
      });
      queryCache.invalidateQueries([queryKeys.teams]);
      queryCache.invalidateQueries([queryKeys.teams]);
      Notification({ success: true, message: 'The team has been deleted.' });
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not delete the team. ${err.message}`,
        });
      }
    },
  });
  return (
    <ActionIcon
      color="red"
      onClick={() => {
        openConfirmModal({
          title: <Text fw={600}>Team Deletion Confirmation</Text>,
          // centered: true,
          confirmProps: {
            color: 'red',
            size: 'xs',
            radius: 'md',
          },
          cancelProps: {
            color: 'gray',
            size: 'xs',
            radius: 'md',
          },
          children: (
            <>
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title={`Are you certain you want to proceed with deleting the team`}
                color="red"
              >
                <Text weight={500}>{team.name} ?</Text>
              </Alert>
            </>
          ),
          labels: {
            confirm: 'DELETE TEAM',
            cancel: 'Cancel',
          },
          onCancel: () => {
            // setSelectedTagId(undefined);
          },
          onConfirm: () => deleteEmployee.mutate(team.id),
        });
      }}
    >
      <IconTrash size="1rem" stroke={1.5} />
    </ActionIcon>
  );
};

export default ConfirmTeamDelete;
