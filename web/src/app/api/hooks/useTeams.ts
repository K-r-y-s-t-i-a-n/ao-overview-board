import { useQuery } from '@tanstack/react-query';
import { Team } from '../../interfaces';
import { api, queryKeys } from '..';

async function getTeams() {
  return await api.get<Team[]>('/teams').then((res) => res.data);
}

interface ReturnProps {
  data: Team[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  isFetching: boolean;
}

export function useTeams(): ReturnProps {
  // const queryCache = useQueryClient();

  const {
    data = [],
    isError,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.teams],
    queryFn: getTeams,
  });

  return { data, isLoading, isError, refetch, isFetching };
}
