import type {
  SigninModelBody,
  SigninModelResponse,
  SignupModelBody,
  SignupModelResponse
} from "../../src/network/spec/auth/model";
import { API_SPEC } from "../../src/network/spec";
import { rest } from "msw";
import type {
  CreateTodoModelBody,
  DeleteTodoModelBody,
  GetTodosModelBody,
  UpdateTodoModelBody
} from "../../src/network/spec/todo/model";

const handlers = [
  // auth
  rest.post<SignupModelBody, {}, SignupModelResponse>(
    API_SPEC.auth.signup.url,
    (req, res, ctx) => {}
  ),
  rest.get<SigninModelBody, {}, SigninModelResponse>(
    API_SPEC.auth.signin.url,
    (req, res, ctx) => {}
  ),

  // todos
  rest.post<CreateTodoModelBody>(
    API_SPEC.todos.createTodo.url,
    (req, res, ctx) => {}
  ),

  rest.get<GetTodosModelBody>(
    API_SPEC.todos.getTodos.url,
    (req, res, ctx) => {}
  ),

  rest.put<UpdateTodoModelBody>(
    API_SPEC.todos.updateTodo.url,
    (req, res, ctx) => {}
  ),

  rest.delete<DeleteTodoModelBody>(
    API_SPEC.todos.deleteTodo.url,
    (req, res, ctx) => {}
  )
];
