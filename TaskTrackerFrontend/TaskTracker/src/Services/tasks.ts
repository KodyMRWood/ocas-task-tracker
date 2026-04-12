import type { Task } from "../types";

const API = "/api/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API);
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, isComplete: false })
  });
  return res.json();
}

export async function updateTask(task: Task) {
  await fetch(`${API}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
}

export async function deleteTask(id: number) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}