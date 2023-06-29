export interface User {
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar?: string;
  team?: string;
  role: {
    id: string;
    name: string;
    permissions: [id: string, name: string];
  };
}
