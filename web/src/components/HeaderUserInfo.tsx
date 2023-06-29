import { forwardRef } from 'react';
import { IconChevronRight, IconSettings } from '@tabler/icons-react';
import { Group, Avatar, Text, UnstyledButton, Menu } from '@mantine/core';
// import ColorSchemeToggleButton from './ColorSchemeToggleButton';
import { useUserStore } from '../app/store';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  imageLabel: string;
  name: string;
  position: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, imageLabel, name, position, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          // backgroundColor:
          //   theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          // borderRadius: theme.radius.md,
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="md">
          {imageLabel}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {position}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

const HeaderUserInfo = () => {
  const user = useUserStore((store) => store.data);

  // const handleClick = () => {
  //   navigate('/my-settings');
  // };
  // if (!user) {
  //   return <p>Error</p>;
  // }
  return (
    <Group position="center">
      <Menu withArrow width={200} offset={-10} shadow="lg">
        <Menu.Target>
          <UserButton
            image={user?.avatar || ''}
            name={user?.display_name || ''}
            position={user?.team || ''}
            imageLabel={`${user?.first_name[0].toUpperCase()}${user?.last_name[0].toUpperCase()}`}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} />}>My settings</Menu.Item>
          {/* <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item> */}
          {/* <Menu.Item
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size="xs" color="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item> */}

          <Menu.Divider />
          {/* <Menu.Label>Set theme</Menu.Label>
          <ColorSchemeToggleButton variant="primary" /> */}
          {/* <Menu.Divider /> */}

          {/* <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              Transfer my data
            </Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Delete my account
            </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default HeaderUserInfo;
