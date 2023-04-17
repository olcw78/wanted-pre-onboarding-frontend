import { authSpec } from "./auth/auth.spec";
import { todoSpec } from "./todo/todo.spec";

export const API_SPEC = Object.freeze({
  ...authSpec,
  ...todoSpec
});

export type ApiSpecT = typeof API_SPEC;
