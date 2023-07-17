import { Flex, Title } from '@mantine/core';
import ChangePasswordForm from './ChangePasswordForm';
import Profile from './Profile';
import { ViewWrapper } from '../../components/core';
import { UI } from '../../app/constants';

const MySettings = () => {
  return (
    <ViewWrapper>
      <Title mb={UI.PAGE_TITLE_MB}>My Settings</Title>
      <Flex direction="column" gap={8}>
        <Profile />
        <ChangePasswordForm />
      </Flex>
    </ViewWrapper>
  );
};

export default MySettings;
