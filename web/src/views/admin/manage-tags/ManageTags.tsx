import { useTags } from '../../../app/api/hooks/useTags';
import { AppCard, ViewWrapper } from '../../../components/core';
import { Title } from '@mantine/core';

const ManageTags = () => {
  const {} = useTags();
  return (
    <ViewWrapper>
      <Title mb={12}>Manage Tags & Categories</Title>

      <div>ManageTags</div>
      <AppCard>
        This is the manage tags page. Here you can add and remove teams as well
      </AppCard>
    </ViewWrapper>
  );
};

export default ManageTags;
