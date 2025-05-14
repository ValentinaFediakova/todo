import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { Filter, Task } from "./types";
import { loadTodos } from "./todosLocalStorage";

interface State {
  tasks: Task[];
  filter: Filter;
}

const initialState: State = {
  tasks: loadTodos(),
  filter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text: text,
          completed: false,
        },
      }),
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [moved] = state.tasks.splice(from, 1);
      state.tasks.splice(to, 0, moved);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  setFilter,
  reorderTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
