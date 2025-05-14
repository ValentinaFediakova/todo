import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  editTodo,
  reorderTodos,
} from "./todosSlice";
import { saveTodos } from "./todosLocalStorage";
import type { RootState } from "../../features/todos/types";

export const todosListener = createListenerMiddleware();

todosListener.startListening({
  matcher: isAnyOf(addTodo, removeTodo, toggleTodo, editTodo, reorderTodos),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    saveTodos(state.todos.tasks);
  },
});
