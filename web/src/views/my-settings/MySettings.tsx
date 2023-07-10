import { Flex } from '@mantine/core';
import ChangePasswordForm from './ChangePasswordForm';
import Profile from './Profile';
import { ViewWrapper } from '../../components/core';

const MySettings = () => {
  return (
    <ViewWrapper>
      <Flex direction="column" gap={8}>
        <Profile />
        <ChangePasswordForm />
      </Flex>
    </ViewWrapper>
  );
};

export default MySettings;
