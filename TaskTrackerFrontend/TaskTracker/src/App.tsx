import { useEffect, useState } from "react";
import type { Task } from "./types";
import { getTasks, createTask, updateTask, deleteTask } from "./Services/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

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
      const newTask = await createTask(trimmedTitle, trimmedDescription, due);
      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save task. Please try again."
      );
    }
  }

  async function toggleComplete(task: Task) {
    const updated = { ...task, status: !task.status};
    await updateTask(updated);
    setTasks(tasks.map(t => (t.id === task.id ? updated : t)));
  }

  async function removeTask(id: number) {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Tracker</h1>

      {error && (
        <div style={{ color: "#a00", marginBottom: 12 }}>{error}</div>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        required
        maxLength={100}
      />
      <input
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
     <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      
      {/* Create a date entry, add to add Task */}
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <div>{task.description}</div>
            <div>
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
            </div>
            <label>
              <input
                type="checkbox"
                checked={task.status}
                onChange={() => toggleComplete(task)}
              />
              Completed
            </label>
            <button onClick={() => removeTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;