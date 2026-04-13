import type { Task } from "../types";


const API = "/api/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API);
  return res.json();
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(API, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id})
  });
  return res.json();
}


export async function createTask(title: string, description: string, dueDate?: Date): Promise<Task> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, dueDate, status: 0 })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.title || error?.message || JSON.stringify(error));
  }

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