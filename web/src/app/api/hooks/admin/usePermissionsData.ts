import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '../..';
import { Role } from '../../../interfaces/role.interface';

async function getPermissions() {
  return await api.get<Role['permissions'][]>('/permissions').then((res) => res.data);
}

interface ReturnProps {
  data: Role['permissions'][];
  isLoading: boolean;
  isError: boolean;
}

export function usePermissionsData(): ReturnProps {
  // const queryCache = useQueryClient();

  const {
    data = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: [queryKeys.permissions],
    queryFn: getPermissions,
  });

  return { data, isLoading, isError };
}
