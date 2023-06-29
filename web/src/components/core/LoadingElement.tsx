import { Card, Center, Loader, Text } from '@mantine/core';

interface Props {
  text?: string | undefined;
}

const LoadingElement = ({ text = undefined }: Props) => {
  return (
    <Card>
      <Center mb={10}>
        <Loader variant="dots" color="green" />
      </Center>
      {text && (
        <Center>
          <Text size="sm" weight="600">
            {text}
          </Text>
        </Center>
      )}
    </Card>
  );
};

export default LoadingElement;
