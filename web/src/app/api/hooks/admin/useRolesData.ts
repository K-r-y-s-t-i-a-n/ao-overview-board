import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '../..';
import { Role } from '../../../interfaces/role.interface';

async function getRoles() {
  return await api.get<Role[]>('/roles').then((res) => res.data);
}

interface ReturnProps {
  data: Role[];
  isLoading: boolean;
  isError: boolean;
}

export function useRolesData(): ReturnProps {
  // const queryCache = useQueryClient();

  const {
    data = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.roles],
    queryFn: getRoles,
  });

  return { data, isLoading, isError };
}
