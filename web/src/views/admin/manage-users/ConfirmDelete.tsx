import { ActionIcon, Alert, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconAlertCircle, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '../../../app/api';
import { Employee } from '../../../app/interfaces';
import { Notification } from '../../../components/core';
import { AxiosError } from 'axios';

interface Props {
  employee: Employee;
}

const ConfirmDelete = ({ employee }: Props) => {
  const queryCache = useQueryClient();

  const deleteEmployee = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/admin/employees/${id}`);
    },
    onSuccess: (res) => {
      queryCache.setQueryData([queryKeys.employees], (employees?: Employee[]) => {
        if (employees) {
          const filteredEmployees = employees.filter((obj) => obj.id != res.data.id);
          return filteredEmployees || undefined;
        }
      });
      queryCache.invalidateQueries([queryKeys.employees]);
      queryCache.invalidateQueries([queryKeys.user]);
      Notification({ success: true, message: 'The account has been deleted.' });
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        Notification({
          error: true,
          message: `Could not delete the action. ${err.message}`,
        });
      }
    },
  });
  return (
    <ActionIcon
      color="red"
      onClick={() => {
        openConfirmModal({
          title: <Text fw={600}>Account Deletion Confirmation</Text>,
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
                title={`Are you certain you want to proceed with deleting the account for`}
                color="red"
              >
                <Text weight={500}>{employee.display_name} ?</Text>
              </Alert>
            </>
          ),
          labels: {
            confirm: 'DELETE ACCOUNT',
            cancel: 'Cancel',
          },
          onCancel: () => {
            // setSelectedTagId(undefined);
          },
          onConfirm: () => deleteEmployee.mutate(employee.id),
        });
      }}
    >
      <IconTrash size="1rem" stroke={1.5} />
    </ActionIcon>
  );
};

export default ConfirmDelete;
