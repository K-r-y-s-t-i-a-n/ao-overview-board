export interface Employee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  last_visited_at: Date;
  avatar?: string;
  team: {
    id: string | undefined;
    name: string | undefined;
    color: string | undefined;
  };
  role: {
    id: string | undefined;
    name: string | undefined;
    // permissions: [id: string, name: string];
  };
}
