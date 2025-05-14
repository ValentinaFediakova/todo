import { TODOS_KEY } from "../../constants/localstorage";
import type { Task } from "../../features/todos/types";

export function loadTodos(): Task[] {
  try {
    const data = localStorage.getItem(TODOS_KEY);
    if (!data) return [];
    return JSON.parse(data) as Task[];
  } catch {
    console.error("Failed to load todos from localStorage");
    return [];
  }
}

export function saveTodos(tasks: Task[]): void {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(tasks));
  } catch {
    console.error("Failed to save todos to localStorage");
  }
}
