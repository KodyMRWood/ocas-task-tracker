import { useEffect, useState } from "react";
import type { Task } from "./types";
import { getTasks, createTask, updateTask, deleteTask } from "./Services/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  async function addTask() {
    if (!title.trim()) return;
    const newTask = await createTask(title);
    setTasks([...tasks, newTask]);
    setTitle("");
  }

  async function toggleComplete(task: Task) {
    const updated = { ...task, isComplete: !task.isComplete };
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

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => toggleComplete(task)}
            />
            {task.title}
            <button onClick={() => removeTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;