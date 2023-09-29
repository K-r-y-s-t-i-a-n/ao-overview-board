import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ModalTitle, Notification } from '../../components/core';
import { api, queryKeys } from '../../app/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Action } from '../../app/interfaces';
import { AxiosError } from 'axios';
// import { LoadingElement } from '../../../components/core';

interface Props {
  action: Action;
  setAction: (action: Action) => void;
}

type FormProps = {
  step: string;
};

const AddStepModal = ({ action, setAction }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const queryCache = useQueryClient();

  const form = useForm({
    initialValues: {
      step: '',
    },

    validate: {
      step: (value) =>
        value.length < 5
          ? 'Step needs to be at least 5 characters long'
          : value.length > 1000
          ? 'Maximum 1000 characters.'
          : null,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: FormProps) => {
      return api.post<Action>('/actions/' + action.id + '/steps', values);
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
      form.reset();
      Notification({ message: `Step has been added` });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not add the step. ${err.message}`,
        });
      }
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="New Action Step" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        <form
          onSubmit={form.onSubmit((values) => {
            mutation.mutate(values as FormProps);
          })}
        >
          <Textarea
            variant="filled"
            placeholder="Next action step"
            label="Action Step"
            withAsterisk
            autosize
            minRows={1}
            maxRows={4}
            disabled={mutation.isLoading}
            {...form.getInputProps('step')}
          />

          <Group mt="sm" position="right">
            <Button
              variant="white"
              // color="spec"
              onClick={() => {
                close();
                form.reset();
              }}
              disabled={mutation.isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" loading={mutation.isLoading}>
              Save
            </Button>
          </Group>
        </form>
      </Modal>

      <Button
        // variant="light"
        onClick={open}
        mb={16}
      >
        ADD NEXT STEP
      </Button>
    </>
  );
};

export default AddStepModal;
