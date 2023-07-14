import { Card, Center, Loader, Text } from '@mantine/core';
import { ViewWrapper } from '.';

interface Props {
  text?: string | undefined;
}

export const LoadingElement = ({ text = undefined }: Props) => {
  return (
    <ViewWrapper>
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
    </ViewWrapper>
  );
};
