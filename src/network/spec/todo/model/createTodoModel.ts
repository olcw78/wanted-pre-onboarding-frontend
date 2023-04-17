export interface CreateTodoModelBody {
  todo: string;
}

export interface CreateTodoModelResponse {
  readonly id: number;
  todo: string;
  isCompleted: boolean;
  readonly userId: number;
}
