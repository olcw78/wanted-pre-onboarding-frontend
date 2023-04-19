import type {
  SigninModelBody,
  SigninModelResponse,
  SignupModelBody
} from "../../network/spec/auth/model";
import { API_SPEC } from "../../network/spec";
import { PathParams, rest } from "msw";
import type {
  CreateTodoModelBody,
  CreateTodoModelResponse,
  DeleteTodoModelBody,
  GetTodosModelBody,
  GetTodosModelResponse,
  UpdateTodoModelBody,
  UpdateTodoModelResponse
} from "../../network/spec/todo/model";
import { EHTTPStatusCode } from "../../network/httpClient/enum/EHTTPStatusCode";

export const handlers = [
  // auth
  // sign up
  rest.post<SignupModelBody>(API_SPEC.auth.signup.url, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(EHTTPStatusCode.CREATED));
  }),

  // sign in
  rest.get<SigninModelBody, {}, SigninModelResponse>(
    API_SPEC.auth.signin.url,
    (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.status(EHTTPStatusCode.SUCCEED),
        ctx.json({
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjo0LCJpYXQiOjE2NTk5MDQyMTUsImV4cCI6MTY2MDUwOTAxNX0.DyUCCsIGxIl8i_sGFCa3uQcyEDb9dChjbl40h3JWJNc"
        })
      );
    }
  ),

  // todos
  // create Todos
  rest.post<CreateTodoModelBody, PathParams, CreateTodoModelResponse>(
    API_SPEC.todos.createTodo.url,
    (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.status(EHTTPStatusCode.CREATED),
        ctx.json({
          id: 1,
          todo: "과제하기",
          isCompleted: false,
          userId: 1
        })
      );
    }
  ),

  // get todos
  rest.get<GetTodosModelBody, PathParams, GetTodosModelResponse>(
    API_SPEC.todos.getTodos.url,
    (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.status(EHTTPStatusCode.SUCCEED),
        ctx.json([
          {
            id: 1,
            todo: "과제하기",
            isCompleted: false,
            userId: 1
          },
          {
            id: 1,
            todo: "과제하기",
            isCompleted: false,
            userId: 1
          }
        ])
      );
    }
  ),

  // update todos
  rest.put<UpdateTodoModelBody, PathParams, UpdateTodoModelResponse>(
    API_SPEC.todos.updateTodo.url(1),
    (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.status(EHTTPStatusCode.CREATED),
        ctx.json({
          id: 1,
          todo: "과제하기",
          isCompleted: true,
          userId: 1
        })
      );
    }
  ),

  // delete todos
  rest.delete<DeleteTodoModelBody>(
    API_SPEC.todos.deleteTodo.url(1),
    (req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(EHTTPStatusCode.NO_CONTENT));
    }
  )
];
