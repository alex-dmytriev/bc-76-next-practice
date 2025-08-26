import axios from "axios";
import type { NewTask, Task } from "../types/task";

const instance = axios.create({
  baseURL: "https://tasks-back-9h2m.onrender.com",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TASK_TOKEN}`,
  },
});

interface FetchedTasksResponse {
  tasks: Task[];
  totalPages: number;
}

export async function fetchedTasks(
  page: number,
  search: string
): Promise<FetchedTasksResponse> {
  const { data } = await instance.get<FetchedTasksResponse>("/tasks", {
    params: { perPage: 12, page, search },
  });
  return data;
}

export async function fetchTaskById(id: string): Promise<Task> {
  const { data } = await instance.get<Task>(`/tasks/${id}`);
  return data;
}

export async function createTask(newTask: NewTask): Promise<Task> {
  const { data } = await instance.post<Task>("/tasks", newTask);
  return data;
}

export async function deleteTask(id: string): Promise<Task> {
  const { data } = await instance.delete<Task>(`/tasks/${id}`);
  return data;
}
