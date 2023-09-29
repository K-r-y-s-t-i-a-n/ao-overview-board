import { useQuery } from '@tanstack/react-query';
import { Action } from '../../interfaces';
import { api, queryKeys } from '..';

async function getActions() {
  return await api.get<Action[]>('/actions').then((res) => res.data);
}

interface ReturnProps {
  actions: Action[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useActions(): ReturnProps {
  // const queryCache = useQueryClient();

  const {
    data: actions = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.actions],
    queryFn: getActions,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 6000,
  });

  return { actions, isLoading, isError, refetch };
}
