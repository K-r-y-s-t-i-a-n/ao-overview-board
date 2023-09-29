import { useQuery } from '@tanstack/react-query';
import { Category } from '../../interfaces';
import { api } from '../axios/axios';
import { queryKeys } from '..';
import { useEffect, useState } from 'react';

export async function getCategories() {
  return await api.get<Category[]>('/categories').then((res) => res.data);
}

interface UseCategories {
  selectCategories: { value: string; label: string }[];
  categories: Category[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

export function useCategories(): UseCategories {
  const [selectCategories, setSelectCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const {
    data: categories,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.categories],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (categories && categories?.length > 0) {
      setSelectCategories(categories.map((cat) => ({ value: cat.id, label: cat.name })));
    }
  }, [categories]);

  return { selectCategories, categories, isLoading, isFetching };
}
