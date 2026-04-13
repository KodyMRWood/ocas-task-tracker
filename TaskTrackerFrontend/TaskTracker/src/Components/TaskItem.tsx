import type { Task, TaskStatus } from "../types";

type TaskItemProps = {
  task: Task;
  onStatusChange: (task: Task, newStatus: TaskStatus) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
};

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 0, label: "Not Start" },
  { value: 1, label: "In Progress" },
  { value: 2, label: "Completed" },
];

export default function TaskItem({ task, onStatusChange, onRemove }: TaskItemProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-0 w-full items-center content-center relative border-2">
      <h3 className="col-span-2 w-full pb-4 border-b-2 my-4">
        <strong>{task.title}</strong>
      </h3>
      <p className="col-span-2 row-start-2 px-4">{task.description}</p>
      <p className="col-span-1 row-start-3">
        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
      </p>
      <div className="col-span-1 row-start-3 flex flex-row items-center pr-4">
        <label htmlFor={`status-${task.id}`} style={{ marginRight: 8 }}>
          Status:
        </label>
        <select
          className="input-field"
          id={`status-${task.id}`}
          value={task.status}
          onChange={(e) => onStatusChange(task, Number(e.target.value) as TaskStatus)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button className="absolute top-0 right-0" onClick={() => onRemove(task.id)}>
        X
      </button>
    </div>
  );
}
