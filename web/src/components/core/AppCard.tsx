import { Card } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  mb?: number;
}

const AppCard: FC<Props> = ({ children, mb = 4 }): JSX.Element => {
  return (
    <Card shadow="sm" radius="sm" mb={mb}>
      {children}
    </Card>
  );
};

export default AppCard;
