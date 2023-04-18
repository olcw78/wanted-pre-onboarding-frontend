export interface CreateTodoModelBody {
  todo: string;
}

export interface CreateTodoModelResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
