import {
  ActionIcon,
  Box,
  Center,
  Group,
  SegmentedControl,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconSun, IconMoonStars, IconMoon } from '@tabler/icons-react';

interface Props {
  variant?: string;
}

const ColorSchemeToggleButton = ({ variant = '' }: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  if (variant === 'primary')
    return (
      <Group position="center" my="sm">
        <SegmentedControl
          value={colorScheme}
          onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
          data={[
            {
              value: 'light',
              label: (
                <Center>
                  <IconSun size={16} stroke={1.5} />
                  <Box ml={10}>Light</Box>
                </Center>
              ),
            },
            {
              value: 'dark',
              label: (
                <Center>
                  <IconMoon size={16} stroke={1.5} />
                  <Box ml={10}>Dark</Box>
                </Center>
              ),
            },
          ]}
        />
      </Group>
    );

  if (variant === 'secondary')
    return (
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark' ? theme.colors.green[4] : theme.colors.green[6],
        })}
      >
        {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
      </ActionIcon>
    );

  return (
    <Switch
      checked={colorScheme === 'dark'}
      onChange={() => toggleColorScheme()}
      size="sm"
      onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
      offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
    />
  );
};

export default ColorSchemeToggleButton;
