import { useEffect, useState } from 'react';
import { PERMISSIONS, UI } from '../../../app/constants';
import { AppCard, CardTitle, ViewWrapper } from '../../../components/core';
import { Group, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../../app/hooks';

const ManageTags = () => {
  const canManageTags = usePermissions(PERMISSIONS.EDIT_TAGS);
  const navigate = useNavigate();
  const [isEditing] = useState();

  useEffect(() => {
    if (!canManageTags) navigate('/');
  }, [canManageTags, navigate]);

  return (
    <ViewWrapper>
      <Title mb={UI.PAGE_TITLE_MB}>Manage Tags & Categories</Title>

      <Group grow>
        <div>
          <CardTitle title={isEditing ? 'Edit selected tag' : 'Create new tag'} />
          <AppCard>Manage Tags</AppCard>
        </div>

        <div>
          <CardTitle title="Available tags" />
          <AppCard>Manage Categories</AppCard>
        </div>
      </Group>
    </ViewWrapper>
  );
};

export default ManageTags;
