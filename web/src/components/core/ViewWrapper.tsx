import { Box } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const ViewWrapper: FC<Props> = ({ children }): JSX.Element => {
  return (
    <Box sx={{ maxWidth: '1600px', marginLeft: 'auto', marginRight: 'auto', padding: 0 }}>
      {children}
    </Box>
  );
};
