import type { Task, TaskStatus } from "../types";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onStatusChange: (task: Task, newStatus: TaskStatus) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
};

export default function TaskList({ tasks, onStatusChange, onRemove }: TaskListProps) {
  return (
    <div className="flex flex-wrap gap-4 px-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
