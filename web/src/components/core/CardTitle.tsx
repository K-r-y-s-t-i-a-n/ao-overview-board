import { DefaultMantineColor, Text } from '@mantine/core';

interface Props {
  title: string;
  variant?: 'gradient' | 'text' | undefined;
  color?: 'dimmed' | DefaultMantineColor | undefined;
}
export const CardTitle = ({ title, variant = 'gradient', color = undefined }: Props) => {
  // const theme = useMantineTheme();

  return (
    <Text
      // variant={theme.colorScheme === 'dark' ? 'text' : 'gradient'}
      variant={variant}
      size={16}
      fw={600}
      mb={4}
      color={color}
    >
      {title}
    </Text>
  );
};
