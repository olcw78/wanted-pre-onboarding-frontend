import { TodoModel } from "./TodoModel";

export interface CreateTodoModelBody {
  todo: string;
}

export interface CreateTodoModelResponse extends TodoModel {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
