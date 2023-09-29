export interface Tag {
  id: string;
  name: string;
}

export interface CategoryTags {
  id: string;
  name: string;
  tags: Tag[];
}

export interface Category {
  id: string;
  name: string;
}
