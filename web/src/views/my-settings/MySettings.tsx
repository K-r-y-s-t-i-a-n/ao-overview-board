import { Flex } from '@mantine/core';
import ChangePasswordForm from './ChangePasswordForm';
import Profile from './Profile';

const MySettings = () => {
  return (
    <Flex direction="column" gap={8}>
      <Profile />
      <ChangePasswordForm />
    </Flex>
  );
};

export default MySettings;
