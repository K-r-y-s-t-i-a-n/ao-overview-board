/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Group, TextInput, Checkbox, SimpleGrid } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { api, queryKeys } from '../../../app/api';
import { LoadingElement, ModalTitle, Notification } from '../../../components/core';
import { usePermissionsData, useRolesData } from '../../../app/api/hooks/admin';
import { useState } from 'react';
import { Role } from '../../../app/interfaces/role.interface';
import { AxiosError } from 'axios';

interface Props {
  role: Role;
}

const EditRoleModal = ({ role }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const permissions = usePermissionsData();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    role.permissions.map((p) => p.id)
  );
  const queryCache = useQueryClient();
  const isLoading = false;
  const { refetch: refetchRoles } = useRolesData();

  const mutation = useMutation({
    mutationFn: (name: string) => {
      return api.put<Role>('/roles/' + role.id, {
        name,
        permissions: selectedPermissions,
      });
    },
    onSuccess: (res) => {
      try {
        queryCache.setQueryData([queryKeys.roles], (cachedRoles?: Role[]) => {
          if (cachedRoles) {
            const index = cachedRoles.findIndex((r) => r.id === res.data.id);
            if (index !== -1) cachedRoles[index] = res.data;
          } else {
            cachedRoles = [res.data];
          }
          return cachedRoles;
        });
      } catch (e) {
        console.log(e);
      }
      queryCache.invalidateQueries([queryKeys.roles]);
      refetchRoles();
      close();
      // form.reset();
      Notification({ color: 'green', message: role.name + ' has been updated.' });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return Notification({
          error: true,
          message: err.response?.data.message,
        });
      }
    },
  });

  const onPermissionChange = (id: string) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions((permissionsState) =>
        permissionsState.filter((p) => p !== id)
      );
    } else {
      setSelectedPermissions((permissionsState) => [...permissionsState, id]);
    }
  };

  const form = useForm({
    initialValues: {
      name: role.name,
    },

    validate: {
      name: (value) =>
        value.trim().length < 3 ? 'Note has to be at least 3 characters' : null,
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<ModalTitle text="Edit Role" />}
        size={mobileScreen ? '100%' : 'xl'}
      >
        {/* Modal content */}
        {isLoading || !permissions.data.length ? (
          <LoadingElement />
        ) : (
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values.name))}>
            <TextInput
              {...form.getInputProps('name')}
              disabled={mutation.isLoading}
              variant="filled"
              placeholder="Role name"
              label="Role name"
              withAsterisk
              autoComplete="off"
              mb={14}
            />
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: 'xs', cols: 1, spacing: 'sm' }]}
            >
              {permissions.data.map((permission) => (
                <Checkbox
                  key={permission.id + role.id + 'checkbox'}
                  // checked={role.permissions.some((perm) => perm.id === permission.id)}
                  checked={selectedPermissions.includes(permission.id)}
                  radius="md"
                  label={permission.display_name}
                  disabled={mutation.isLoading}
                  onChange={() => onPermissionChange(permission.id)}
                />
              ))}
            </SimpleGrid>

            <Group mt="lg" position="right">
              <Button
                variant="white"
                // color="spec"
                onClick={() => {
                  close();
                  // setSelectedPermissions([]);
                  form.reset();
                  // setModalOpen(false);
                  // setSelectedImages([]);
                }}
                // disabled={mutation.isLoading}
              >
                Cancel
              </Button>
              <Button
                // sx={{
                //   backgroundColor: theme.colorScheme === 'dark' ? '#0F462A' : '',
                // }}
                type="submit"
                color="spec"
                loading={mutation.isLoading}
              >
                Add
              </Button>
            </Group>
          </form>
        )}
      </Modal>

      <Button onClick={open} size="xs" variant="light">
        <IconPencil size="1rem" stroke={2.5} />
      </Button>
    </>
  );
};

export default EditRoleModal;
