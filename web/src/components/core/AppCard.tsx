import { Card } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  mb?: number;
  p?: number;
  px?: number;
  bg?: string;
}

export const AppCard: FC<Props> = ({ children, mb = 4, p, px, bg }): JSX.Element => {
  return (
    <Card shadow="sm" radius="md" mb={mb} p={p} px={px} bg={bg}>
      {children}
    </Card>
  );
};
