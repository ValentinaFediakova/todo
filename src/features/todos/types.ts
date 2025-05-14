import { store } from "../../store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export type Filter = "all" | "active" | "completed";
