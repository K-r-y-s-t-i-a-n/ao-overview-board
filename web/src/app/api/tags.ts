import { Category, CategoryTags, Tag } from '../interfaces';
import api from './axios';

export async function getTags() {
  return await api.get<Tag[]>('/tags').then((res) => res.data);
}

export async function getTagsByCategory() {
  return await api.get<CategoryTags[]>('/tags-by-category').then((res) => res.data);
}

export async function getCategories() {
  return await api.get<Category[]>('/categories').then((res) => res.data);
}
