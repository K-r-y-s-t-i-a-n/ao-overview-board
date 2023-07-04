import { Box, Button, Group, TextInput } from '@mantine/core';
import CardTitle from '../../components/core/CardTitle';
import AppCard from '../../components/core/AppCard';

const ChangePasswordForm = () => {
  return (
    <Box sx={{ animation: 'slide-up .3s' }}>
      <CardTitle title="Change password" />
      <AppCard mb={12}>
        <Group mb={8}>
          <TextInput
            variant="filled"
            placeholder="Current Password"
            label="Old password"
            withAsterisk
            type="password"
          />
          <TextInput
            variant="filled"
            placeholder="New password"
            label="New password"
            withAsterisk
            type="password"
          />
          <TextInput
            variant="filled"
            placeholder="Confirm new password"
            label="Confirm new password"
            withAsterisk
            type="password"
          />
        </Group>

        <Button mt={6} variant="light" size="xs">
          Save
        </Button>
      </AppCard>
    </Box>
  );
};

export default ChangePasswordForm;
