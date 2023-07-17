import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  Modal,
  Button,
  Group,
  Text,
  TextInput,
  Checkbox,
  SimpleGrid,
} from '@mantine/core';
import { IconNewSection } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { api, queryKeys } from '../../../app/api';
import { LoadingElement, ModalTitle, Notification } from '../../../components/core';
import { usePermissionsData } from '../../../app/api/hooks/admin';
import { useState } from 'react';
import { Role } from '../../../app/interfaces/role.interface';
import { AxiosError } from 'axios';

const NewRoleModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const mobileScreen = useMediaQuery('(max-width: 48em)');
  const permissions = usePermissionsData();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const queryCache = useQueryClient();
  const isLoading = false;

  const mutation = useMutation({
    mutationFn: (name: string) => {
      return api.post<Role>('/roles', {
        name,
        permissions: selectedPermissions,
      });
    },
    onSuccess: (res) => {
      try {
        queryCache.setQueryData([queryKeys.roles], (roles?: Role[]) => {
          if (roles) {
            roles = [...(roles || []), res.data];
          }
          return roles || undefined;
        });
      } catch (e) {
        console.log(e);
      }
      setSelectedPermissions([]);
      queryCache.invalidateQueries();
      close();
      form.reset();
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
      name: '',
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
        title={<ModalTitle text="New Role" />}
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
            <SimpleGrid cols={2}>
              {permissions.data.map((permission) => (
                <Checkbox
                  key={permission.id + 'checkbox'}
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
                  setSelectedPermissions([]);
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

      <Group position="center">
        <Button onClick={open} size="sm" fullWidth variant="light" mb={14}>
          <IconNewSection /> <Text ml={6}>ADD ROLE</Text>
        </Button>
      </Group>
    </>
  );
};

export default NewRoleModal;
