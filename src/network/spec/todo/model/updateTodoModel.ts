export interface UpdateTodoModelBody {
  todo: string;
  isCompleted: boolean;
}

export interface UpdateTodoModelResponse
  extends Pick<UpdateTodoModelBody, "todo" | "isCompleted"> {}
