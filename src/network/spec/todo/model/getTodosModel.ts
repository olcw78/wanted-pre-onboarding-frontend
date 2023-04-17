export type GetTodosModelBody = never;

export interface GetTodosModelResponse {
  items: Array<{
    id: number;
    todo: string;
    isCompleted: boolean;
    userId: number;
  }>;
}
