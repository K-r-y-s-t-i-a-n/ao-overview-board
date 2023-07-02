import { useQuery } from '@tanstack/react-query';
import { Category, CategoryTags, Tag } from '../../interfaces';
import api from '../axios';
import { queryKeys } from '..';
import { useEffect, useState } from 'react';

export async function getTags() {
  return await api.get<Tag[]>('/tags').then((res) => res.data);
}

export async function getTagsByCategory() {
  return await api.get<CategoryTags[]>('/tags-by-category').then((res) => res.data);
}

export async function getCategories() {
  return await api.get<Category[]>('/categories').then((res) => res.data);
}

interface UseTags {
  selectTags: { value: string; label: string }[];
  tags: Tag[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

export function useTags(): UseTags {
  const [selectTags, setSelectTags] = useState<{ value: string; label: string }[]>([]);

  const {
    data: tags,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.tags],
    queryFn: getTags,
  });

  useEffect(() => {
    if (tags && tags?.length > 0) {
      setSelectTags(tags.map((tag) => ({ value: tag.id, label: tag.name })));
    }
  }, [tags]);

  return { selectTags, tags, isLoading, isFetching };
}
