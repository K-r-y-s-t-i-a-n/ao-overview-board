import { Navigate, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Notes from '../views/notes';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconReceipt2,
  IconDatabaseImport,
  IconShieldLock,
  IconSettings,
} from '@tabler/icons-react';

export const navigationLinks = [
  { link: '/', label: 'Communication Notes', icon: IconBellRinging },
  { link: '/open-actions', label: 'Open Actions', icon: IconReceipt2 },
  { link: '/weekly-updates', label: 'Weekly Updates', icon: IconFingerprint },
  { link: '/overdue-pms', label: 'Overdue PMs', icon: IconKey },
  { link: '/users-management', label: 'Users Management', icon: IconDatabaseImport },
  { link: '/admin', label: 'Admin Panel', icon: IconShieldLock },
  { link: '/settings', label: 'Other Settings', icon: IconSettings },
];

export const adminNavigationLinks = [
  { link: '/', label: 'Communication Notes', icon: IconBellRinging },
  { link: '/open-actions', label: 'Open Actions', icon: IconReceipt2 },
  { link: '/weekly-updates', label: 'Weekly Updates', icon: IconFingerprint },
  { link: '/overdue-pms', label: 'Overdue PMs', icon: IconKey },
  { link: '/users-management', label: 'Users Management', icon: IconDatabaseImport },
  { link: '/admin', label: 'Admin Panel', icon: IconShieldLock },
  { link: '/settings', label: 'Other Settings', icon: IconSettings },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Notes />,
      },
      {
        path: '/open-actions',
        element: <Notes />,
      },
      {
        path: '/weekly-updates',
        element: <Notes />,
      },
      {
        path: '/overdue-pms',
        element: <Notes />,
      },
      {
        path: '/users-management',
        element: <Notes />,
      },
      {
        path: '/*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
