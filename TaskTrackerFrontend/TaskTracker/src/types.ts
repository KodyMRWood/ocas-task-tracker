export type TaskStatus = 0 | 1 | 2;

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
}
