import type {
  CreateTodoModelBody,
  CreateTodoModelResponse,
  GetTodosModelResponse,
  UpdateTodoModelBody,
  UpdateTodoModelResponse
} from "../../spec/todo/model";
import { httpClient } from "../../httpClient/httpClient";
import { API_SPEC } from "../../spec";

export class TodosRequestStatic {
  public static async createTodo({
    todo
  }: CreateTodoModelBody): Promise<CreateTodoModelResponse> {
    const { url } = API_SPEC.todos.createTodo;
    return await httpClient.post<CreateTodoModelBody, CreateTodoModelResponse>(
      url,
      { todo }
    );
  }

  public static async getTodos(): Promise<GetTodosModelResponse> {
    const { url } = API_SPEC.todos.getTodos;
    return await httpClient.get<{}, GetTodosModelResponse>(url);
  }

  public static async deleteTodo(id: string): Promise<void> {
    const { url } = API_SPEC.todos.deleteTodo;
    await httpClient.delete(url(id));
  }

  public static async updateTodo({
    id,
    todo,
    isCompleted
  }: UpdateTodoModelBody & {
    id: string;
  }): Promise<UpdateTodoModelResponse> {
    const { url } = API_SPEC.todos.updateTodo;
    return await httpClient.put<UpdateTodoModelBody, UpdateTodoModelResponse>(
      url(id),
      { todo, isCompleted }
    );
  }

  /* prevent ctor */
  private static TodosRequestStatic() {}
}
