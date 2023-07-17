export interface Role {
  id: string;
  name: string;
  permissions: { id: string; name: string; display_name: string }[];
}
