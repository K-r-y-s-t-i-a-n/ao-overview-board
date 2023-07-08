import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

interface Props {
  error?: boolean;
  success?: boolean;
  color?: string | null;
  title?: string | null;
  message: string;
}

export const Notification = ({
  title = null,
  message,
  color = null,
  error = false,
  success = false,
}: Props) => {
  return showNotification({
    title: error ? 'Error!' : success ? 'Success!' : title ? title : null,
    message,
    color: color ? color : error ? 'red' : 'teal',
    icon: success ? <IconCheck size={18} /> : error ? <IconX size={18} /> : null,
  });
};
