import type { RootState, Task } from "./types";

export const selectVisibleTodos = (state: RootState): Task[] => {
  const { tasks, filter } = state.todos;
  switch (filter) {
    case "active":
      return tasks.filter((t) => !t.completed);
    case "completed":
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
};
