import { Tag } from '.';

export interface Action {
  id: string;
  asset: Tag;
  status: 'Stopped' | 'RWI' | 'Testing' | 'Other';
  issue: string;
  steps: Step[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface Step {
  id: string;
  added_by: string;
  text: string;
  created_at: Date;
  updated_at: Date;
  action_id: string;
}

// export interface Status  'Stopped' | 'RWI' | 'Testing' | 'Other';
