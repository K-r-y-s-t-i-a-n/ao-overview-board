import { Card } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  mb?: number;
}

export const AppCard: FC<Props> = ({ children, mb = 4 }): JSX.Element => {
  return (
    <Card shadow="sm" radius="md" mb={mb}>
      {children}
    </Card>
  );
};
