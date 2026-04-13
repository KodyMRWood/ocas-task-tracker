import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "./types";
import { getTasks, updateTask, deleteTask } from "./Services/tasks";
import TaskCreation from "./Components/TaskCreation";
import TaskList from "./Components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  async function updateTaskStatus(task: Task, newStatus: TaskStatus) {
    const updated = { ...task, status: newStatus };
    await updateTask(updated);
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  }

  async function removeTask(id: number) {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Tracker</h1>
      <h2>by Kody Wood</h2>

      <TaskCreation onTaskCreated={(task) => setTasks([...tasks, task])} />

      <TaskList
        tasks={tasks}
        onStatusChange={updateTaskStatus}
        onRemove={removeTask}
      />
    </div>
  );
}

export default App;