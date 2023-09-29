import { useQuery } from '@tanstack/react-query';
import { Action } from '../../interfaces';
import { api, queryKeys } from '..';

async function getDeletedActions() {
  return await api.get<Action[]>('/actions?trashed').then((res) => res.data);
}

interface ReturnProps {
  actions: Action[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useDeletedActions(): ReturnProps {
  // const queryCache = useQueryClient();

  const {
    data: actions = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.deletedActions],
    queryFn: getDeletedActions,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    // refetchInterval: 6000,
  });

  return { actions, isLoading, isError, refetch };
}
