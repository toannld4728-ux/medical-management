export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  created_at: string;
}
