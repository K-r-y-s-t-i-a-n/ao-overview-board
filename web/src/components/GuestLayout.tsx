import { useQuery } from '@tanstack/react-query';
import { getUser } from '../app/api/axios/auth';
import { Outlet, redirect } from 'react-router-dom';

const GuestLayout = () => {
  const query = useQuery({
    queryKey: ['user'],
    // keepPreviousData: true,
    queryFn: getUser,
    // refetchInterval: 5000,
  });

  if (query.data) {
    // Navigate({ to: '/' });
    return redirect('/');
  }

  return <Outlet />;
};

export default GuestLayout;
