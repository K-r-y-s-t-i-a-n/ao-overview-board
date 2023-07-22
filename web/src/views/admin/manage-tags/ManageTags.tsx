import { useEffect, useState } from 'react';
import { PERMISSIONS, UI } from '../../../app/constants';
import { AppCard, LoadingElement, ViewWrapper } from '../../../components/core';
import {
  Group,
  ScrollArea,
  Table,
  Title,
  Text,
  Modal,
  Alert,
  Badge,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../../app/hooks';
import { getTagsByCategory } from '../../../app/api/hooks/useTags';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../app/api';
import NewTagModal from './NewTagModal';
import TagMenu from './TagMenu';
import { Category, Tag } from '../../../app/interfaces';
import { IconAlertCircle } from '@tabler/icons-react';

const ManageTags = () => {
  const canManageTags = usePermissions(PERMISSIONS.EDIT_TAGS);
  const navigate = useNavigate();
  // const [isEditing] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(
    undefined
  );

  useEffect(() => {
    if (!canManageTags) navigate('/');
  }, [canManageTags, navigate]);

  const tagsQuery = useQuery({
    queryKey: [queryKeys.tagsByCategory],
    queryFn: getTagsByCategory,
  });

  const onDelete = (tag: Tag, category: Category) => {
    setSelectedTag(tag);
    setSelectedCategory(category);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const onEdit = (tag: Tag, category: Category) => {
    setSelectedTag(tag);
    setSelectedCategory(category);
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(true);
  };

  return (
    <ViewWrapper>
      {/* ===================== DELETE MODAL ==================== */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={<Text fw={600}>Tag Deletion Confirmation</Text>}
        size="md"
      >
        <>
          <Alert icon={<IconAlertCircle size="1rem" />} title="Warning!" color="red">
            By deleting the tag you will also delete all the notes associated with it and
            will not be able to recover them. Notes that are conjoined with other tags
            will not be deleted. If there is a typo in the name of the tag you should edit
            it instead of deleting.
          </Alert>
          <Text size="sm" mt={12}>
            Are you sure you want to delete tag{' '}
            <Badge size="sm" color="red">
              {selectedTag?.name}
            </Badge>
            ?
          </Text>

          <Group mt="lg" position="right">
            <Button
              variant="outline"
              sx={{
                color: '#000',
                background: '#fff',
                border: '0.0625rem solid #ced4da',
              }}
              onClick={() => {
                setIsDeleteModalOpen(false);
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
              color="red"
              // loading={mutation.isLoading}
            >
              DELETE TAG
            </Button>
          </Group>
        </>
      </Modal>
      {/* ===================== EDIT MODAL ================ */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="My Modal"
        size="md"
      >
        EDITING
      </Modal>
      <Title mb={UI.PAGE_TITLE_MB}>Manage Tags & Categories</Title>
      {/* ===================================================== */}
      <NewTagModal />
      {tagsQuery.isLoading || !tagsQuery.data ? (
        <LoadingElement />
      ) : (
        // =================== TABLE =============================
        <AppCard>
          <ScrollArea sx={{ animation: 'slide-up .3s' }}>
            <Table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {tagsQuery.data.map((category) => (
                  <tr key={category.name + 'cat'}>
                    <td>
                      <Text fw={500}>{category.name}</Text>
                    </td>
                    <td>
                      <Group>
                        {category.tags.map((t) => (
                          <TagMenu
                            key={t.name + 'tag'}
                            tag={t}
                            category={category}
                            onDelete={onDelete}
                            onEdit={onEdit}
                          />
                        ))}
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        </AppCard>
      )}
    </ViewWrapper>
  );
};

export default ManageTags;
