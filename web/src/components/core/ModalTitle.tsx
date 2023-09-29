import { Text } from '@mantine/core';

interface Props {
  text: string;
}

export const ModalTitle = ({ text }: Props) => {
  return (
    <Text size="xl" weight="600" color="green">
      {text}
    </Text>
  );
};
