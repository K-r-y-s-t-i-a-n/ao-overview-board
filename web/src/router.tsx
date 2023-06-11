import { Navigate, createBrowserRouter } from 'react-router-dom';
// import Dashboard from './views/Dashboard';
// import Surveys from './views/Surveys';
// import Login from './views/Login';
// import Signup from './views/Signup';
// import GuestLayout from './components/GuestLayout';
import DefaultLayout from './components/DefaultLayout';
import CommNotes from './views/comm-notes';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconReceipt2,
  IconDatabaseImport,
  IconShieldLock,
  IconSettings,
} from '@tabler/icons-react';
// import SurveyView from './views/SurveyView';

export const navigationLinks = [
  { link: '', label: 'Communication Notes', icon: IconBellRinging },
  { link: '', label: 'Open Actions', icon: IconReceipt2 },
  { link: '', label: 'Weekly Updates', icon: IconFingerprint },
  { link: '', label: 'Overdue PMs', icon: IconKey },
  { link: '', label: 'Users Management', icon: IconDatabaseImport },
  { link: '', label: 'Admin Panel', icon: IconShieldLock },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <CommNotes />,
      },
      //   {
      //     path: 'dashboard',
      //     element: <Navigate to="/" />,
      //   },
      //   {
      //     path: 'surveys',
      //     element: <Surveys />,
      //   },
      //   {
      //     path: 'surveys/create',
      //     element: <SurveyView />,
      //   },
    ],
  },

  //   {
  //     path: '/',
  //     element: <GuestLayout />,
  // children: [
  //   {
  //     path: 'login',
  //     element: <Login />,
  //   },
  //   {
  //     path: 'signup',
  //     element: <Signup />,
  //   },
  // ],
  //   },
]);

export default router;
