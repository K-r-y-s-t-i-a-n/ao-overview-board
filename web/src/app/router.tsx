import { Navigate, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Notes from '../views/notes';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconReceipt2,
  IconShieldLock,
  IconSettings,
  IconActivityHeartbeat,
  IconUsers,
  IconTrash,
  IconArchive,
} from '@tabler/icons-react';
import OpenActions from '../views/open-actions';
import MySettings from '../views/my-settings';
import ManageUsers from '../views/admin/manage-users';
import DeletedActions from '../views/open-actions-deleted';

export const navigationLinks = [
  { link: '/', label: 'Communication Notes', icon: IconBellRinging },
  // { link: '/', label: 'Communication Notes', icon: IconNotes },
  { link: '/open-actions', label: 'Open Actions', icon: IconActivityHeartbeat },
  { link: '/deleted-actions', label: 'Archived Actions', icon: IconArchive },
  // { link: '/weekly-updates', label: 'Weekly Updates', icon: IconClipboardCheck },
  // { link: '/overdue-pms', label: 'Overdue PMs', icon: IconKey },
  { link: '/manage-users', label: 'Manage Users', icon: IconUsers },

  // { link: '/admin', label: 'Admin Panel', icon: IconShieldLock },
  // { link: '/my-settings', label: 'My Settings', icon: IconSettings },
];

export const adminNavigationLinks = [
  { link: '/', label: 'Communication Notes', icon: IconBellRinging },
  { link: '/open-actions', label: 'Open Actions', icon: IconReceipt2 },
  { link: '/deleted-actions', label: 'Archived Actions', icon: IconTrash },
  { link: '/weekly-updates', label: 'Weekly Updates', icon: IconFingerprint },
  { link: '/overdue-pms', label: 'Overdue PMs', icon: IconKey },
  { link: '/manage-users', label: 'Manage Users', icon: IconUsers },
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
        element: <OpenActions />,
      },
      {
        path: '/deleted-actions',
        element: <DeletedActions />,
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
        path: '/my-settings',
        element: <MySettings />,
      },
      {
        path: '/manage-users',
        element: <ManageUsers />,
      },
      {
        path: '/*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
