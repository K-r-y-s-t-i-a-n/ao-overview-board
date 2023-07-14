import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, Chip } from '@mantine/core';
import { ModalTitle, Notification } from '../../components/core';
import { api, queryKeys } from '../../app/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Action } from '../../app/interfaces';
import { useState } from 'react';
import { AxiosError } from 'axios';
// import { LoadingElement } from '../../../components/core';

interface Props {
  action: Action;
  setAction: (action: Action) => void;
}

const UpdateActionModal = ({ action, setAction }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const [value, setValue] = useState<Action['status']>(action.status);
  const queryCache = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return api.put<Action>('/actions/' + action.id, { status: value });
    },
    onSuccess: (res) => {
      setAction(res.data);
      try {
        queryCache.setQueryData([queryKeys.actions], (actions?: Action[]) => {
          if (actions) {
            const index = actions.findIndex((action) => action.id === res.data.id);
            if (index !== -1) actions[index] = res.data;
          } else {
            actions = [res.data];
          }
          return actions;
        });
      } catch (e) {
        console.log(e);
      }
      queryCache.invalidateQueries([queryKeys.actions]);
      close();
      Notification({ message: `Status of ${action.asset}. has been changed.` });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not change the status. ${err.message}`,
        });
      }
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="New Action Status" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        <Chip.Group value={value} onChange={(v) => setValue(v as Action['status'])}>
          <Group position="center">
            <Chip disabled={mutation.isLoading} value="Stopped">
              Stopped
            </Chip>
            <Chip disabled={mutation.isLoading} value="RWI">
              RWI
            </Chip>
            <Chip disabled={mutation.isLoading} value="Testing">
              Testing
            </Chip>
            <Chip disabled={mutation.isLoading} value="Other">
              Other
            </Chip>
          </Group>
        </Chip.Group>

        <Group mt="sm" position="right">
          <Button
            variant="white"
            onClick={() => {
              close();
            }}
            disabled={mutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={mutation.isLoading}
            onClick={() => {
              action.status === value ? close() : mutation.mutate();
            }}
          >
            Save
          </Button>
        </Group>
      </Modal>

      <Button
        // variant="light"
        onClick={open}
        mb={16}
      >
        CHANGE STATUS
      </Button>
    </>
  );
};

export default UpdateActionModal;
