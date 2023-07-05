export interface Employee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar?: string;
  team?: {
    id: string;
    name: string;
    color: string;
  };
  role: {
    id: string;
    name: string;
    permissions: [id: string, name: string];
  };
}
