import { Box, Button, SimpleGrid, TextInput } from '@mantine/core';
import { CardTitle, AppCard, Notification } from '../../components/core';
import { useMutation } from '@tanstack/react-query';
import { UseFormReturnType, useForm } from '@mantine/form';
import { api } from '../../app/api/axios';
import { AxiosError } from 'axios';

interface UpdatePasswordFormProps {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const ChangePasswordForm = () => {
  const updatePasswordMutation = useMutation({
    mutationFn: (passwordBody: UpdatePasswordFormProps) => {
      return api.put<string | AxiosError>('/user/password', passwordBody);
    },
    onSuccess: () => {
      updatePasswordForm.reset();
      Notification({ success: true, message: 'Your password has been changed.' });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (
          err.response?.data.message ===
          'The provided password does not match your current password.'
        ) {
          return updatePasswordForm.setFieldError(
            'current_password',
            'The provided password does not match your current password.'
          );
        }
        Notification({ error: true, message: 'Something went wrong. Please try again.' });
      }
    },
  });

  const updatePasswordForm: UseFormReturnType<UpdatePasswordFormProps> = useForm({
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },

    validate: {
      current_password: (value) =>
        value.length < 8 ? 'The password must be at least 8 characters.' : null,
      password: (value) =>
        value.length < 8
          ? 'The password must be at least 8 characters.'
          : value !== updatePasswordForm.values.password_confirmation
          ? true
          : null,
      password_confirmation: (value) =>
        value !== updatePasswordForm.values.password
          ? 'Passwords do not match.'
          : value.length < 8
          ? 'The password must be at least 8 characters.'
          : null,
    },
  });

  return (
    <Box sx={{ animation: 'slide-up .3s' }}>
      <CardTitle title="Change password" />
      <AppCard mb={12}>
        <form
          onSubmit={updatePasswordForm.onSubmit((values: UpdatePasswordFormProps) =>
            updatePasswordMutation.mutate(values)
          )}
        >
          <SimpleGrid
            mb={8}
            cols={3}
            breakpoints={[
              { maxWidth: 'md', cols: 2 },
              { maxWidth: 'sm', cols: 1 },
            ]}
          >
            <TextInput
              {...updatePasswordForm.getInputProps('current_password')}
              disabled={updatePasswordMutation.isLoading}
              variant="filled"
              placeholder="Current password"
              label="Current password"
              withAsterisk
              type="password"
              autoComplete="current-password"
            />
            <TextInput
              {...updatePasswordForm.getInputProps('password')}
              disabled={updatePasswordMutation.isLoading}
              variant="filled"
              placeholder="New password"
              label="New password"
              withAsterisk
              type="password"
              autoComplete="new-password"
            />
            <TextInput
              {...updatePasswordForm.getInputProps('password_confirmation')}
              disabled={updatePasswordMutation.isLoading}
              variant="filled"
              placeholder="Confirm new password"
              label="Confirm new password"
              withAsterisk
              type="password"
            />
          </SimpleGrid>

          <Button
            type="submit"
            mt={6}
            variant="light"
            size="xs"
            loading={updatePasswordMutation.isLoading}
          >
            Save
          </Button>
        </form>
      </AppCard>
    </Box>
  );
};

export default ChangePasswordForm;
