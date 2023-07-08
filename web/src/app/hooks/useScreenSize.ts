import { useMediaQuery } from '@mantine/hooks';

export const useScreenSize = () => {
  const xsMaxScreen = useMediaQuery('(max-width: 30em)');
  const smMaxScreen = useMediaQuery('(max-width: 48em)');
  const mdMaxScreen = useMediaQuery('(max-width: 64em)');
  const lgMaxScreen = useMediaQuery('(max-width: 74em)');
  const xlMaxScreen = useMediaQuery('(min-width: 90em)');

  return { xsMaxScreen, smMaxScreen, mdMaxScreen, lgMaxScreen, xlMaxScreen };
};
