import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../..';
import { Employee } from '../../../interfaces';
import { api } from '../../axios';

export async function getEmployees() {
  return await api.get<Employee[]>('/admin/employees').then((res) => res.data);
}

interface UseEmployees {
  employees: Employee[];
  isLoading: boolean;
  isFetching: boolean;
}

export function useEmployees(): UseEmployees {
  const {
    data: employees = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.employees],
    queryFn: getEmployees,
  });

  return { employees, isFetching, isLoading };
}
