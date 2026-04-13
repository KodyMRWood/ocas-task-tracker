import { useState } from "react";
import type { Task, TaskStatus } from "../types";
import { createTask } from "../Services/tasks";


interface TaskCreationProps {
  onTaskCreated: (task: Task) => void;
}

export default function TaskCreation({ onTaskCreated }: TaskCreationProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>(0);
  const [error, setError] = useState("");

  async function addTask() {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }

    if (trimmedTitle.length > 100) {
      setError("Title must be 100 characters or fewer.");
      return;
    }

    let due: Date | undefined;
    if (dueDate) {
      due = new Date(dueDate);
      if (Number.isNaN(due.getTime())) {
        setError("Please select a valid due date.");
        return;
      }
    }

    setError("");

    try {
      const newTask = await createTask(trimmedTitle, trimmedDescription, due, status);
      onTaskCreated(newTask);
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus(0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save task. Please try again."
      );
    }
  }

  return (
    <div  className="my-10">
      {error && (
        <div className="text-red-500">{error}</div>
      )}
        <div className="flex justify-center gap-5 my-10 mx-4">
            <input className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
                required
                maxLength={100}
                />
            <input className="input-field"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                />
            <input  className="input-field"
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                />
            
            <button  className="bg-(--accent-bg) rounded-md w-50 px-3 py-2 " onClick={addTask}>Add</button>
        </div>
    </div>
  );
}
