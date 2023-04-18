import type { TodoModel } from "./TodoModel";

export interface UpdateTodoModelBody
  extends Pick<TodoModel, "todo" | "isCompleted"> {}

export interface UpdateTodoModelResponse
  extends Pick<TodoModel, "todo" | "isCompleted"> {}
