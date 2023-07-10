/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../../interfaces';
import { queryKeys } from '..';
import { useEffect } from 'react';
import { getUser } from '../axios';
import { useUserStore } from '../../store';

export function useUser(): User | undefined {
  const setUser = useUserStore((store) => store.setUser);
  const queryCache = useQueryClient();

  const { data: user, isError } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: getUser,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 0,
    // refetchInterval: 5000,
  });

  useEffect(() => {
    if (isError) {
      queryCache.clear();
      setUser(undefined);
    }
  }, [isError]);

  return user;
}
