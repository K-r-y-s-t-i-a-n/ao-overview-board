import { Card, Sx } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  mb?: number;
  p?: number;
  px?: number;
  bg?: string;
  sx?: Sx | (Sx | undefined)[] | undefined;
}

export const AppCard: FC<Props> = ({ children, mb = 4, p, px, bg, sx }): JSX.Element => {
  return (
    <Card sx={sx} shadow="sm" radius="md" mb={mb} p={p} px={px} bg={bg}>
      {children}
    </Card>
  );
};
