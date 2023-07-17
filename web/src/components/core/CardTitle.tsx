import { Text, useMantineTheme } from '@mantine/core';

interface Props {
  title: string;
}
export const CardTitle = ({ title }: Props) => {
  const theme = useMantineTheme();

  return (
    <Text
      variant={theme.colorScheme === 'dark' ? 'text' : 'gradient'}
      size={16}
      fw={600}
      mb={4}
      // ml={12}
      // sx={{
      //     color: theme.colorScheme === 'dark' ? '#0F462A' : '',
      // }}
    >
      {title}
    </Text>
  );
};
