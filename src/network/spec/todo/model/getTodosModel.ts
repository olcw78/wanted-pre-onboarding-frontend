export type GetTodosModelBody = never;

export interface TodoModel {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface GetTodosModelResponse {
  items: Array<TodoModel>;
}
