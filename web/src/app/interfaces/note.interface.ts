export interface Note {
  id: string;
  text: string;
  added_by: string;
  is_edited: boolean;
  created_at: Date;
  updated_at: Date;
  team?: {
    id: string;
    name: string;
    color: string;
  };
  tags?: {
    id: string;
    name: string;
  }[];
}
