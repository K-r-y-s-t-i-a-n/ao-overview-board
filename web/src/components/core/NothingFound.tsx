import { Box, Card, Center, Text } from '@mantine/core';
import img1 from '../../assets/nothing_found1.svg';
import img2 from '../../assets/nothing_found2.svg';
import img3 from '../../assets/nothing_found3.svg';
import { useScreenSize } from '../../app/hooks/useScreenSize';
import { ViewWrapper } from '.';

interface Props {
  text?: string | undefined;
}

const images = [img1, img2, img3];

export const NothingFound = ({ text = 'Nothing Found' }: Props) => {
  const { mdMaxScreen } = useScreenSize();
  const rndIndex = Math.floor(Math.random() * images.length);
  const rndImg = images[rndIndex];

  return (
    <ViewWrapper>
      <Card>
        {text && (
          <Center>
            <Text size="xl" weight="600">
              {text}
            </Text>
          </Center>
        )}
        <Center mb={10}>
          <Box sx={mdMaxScreen ? { width: '100%' } : { width: 350 }}>
            <img src={rndImg} />
          </Box>
        </Center>
      </Card>
    </ViewWrapper>
  );
};
