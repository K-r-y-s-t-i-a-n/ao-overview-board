import { Badge, Center, Menu } from '@mantine/core';
import { Category, Tag } from '../../../app/interfaces';
import { IconPencil, IconTrash } from '@tabler/icons-react';

interface Props {
  category: Category;
  tag: Tag;
  onDelete: (tag: Tag, category: Category) => void;
  onEdit: (tag: Tag, category: Category) => void;
}

const TagMenu = ({ category, tag, onDelete, onEdit }: Props) => {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <Menu.Target>
        <Badge color="gray" sx={{ ':hover': { cursor: 'pointer' } }}>
          {tag.name}
        </Badge>
      </Menu.Target>
      {/* Menu content */}
      <Menu.Dropdown>
        <Menu.Label>
          <Center>
            <Badge>{tag.name}</Badge>
          </Center>
        </Menu.Label>
        <Menu.Divider />

        <Menu.Item
          icon={<IconPencil size={14} />}
          onClick={() => onEdit(tag, category)}
          disabled
        >
          Edit
        </Menu.Item>

        <Menu.Item
          disabled
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => onDelete(tag, category)}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TagMenu;
