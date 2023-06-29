import { Box, Card, Center, Loader, Text } from '@mantine/core';
import img1 from '../../assets/nothing_found1.svg';
import img2 from '../../assets/nothing_found2.svg';
import img3 from '../../assets/nothing_found3.svg';

interface Props {
  text?: string | undefined;
}

const images = [img1, img2, img3];

const NothingFound = ({ text = 'Nothing Found' }: Props) => {
  const rndIndex = Math.floor(Math.random() * images.length);
  const rndImg = images[rndIndex];

  return (
    <Card>
      {text && (
        <Center>
          <Text size="xl" weight="600">
            {text}
          </Text>
        </Center>
      )}
      <Center mb={10}>
        <Box w={350}>
          <img src={rndImg} />
        </Box>
      </Center>
    </Card>
  );
};

export default NothingFound;
