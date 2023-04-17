import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "./home.page";
import SignInPage from "./signIn.page";
import SignUpPage from "./signup.page";
import TodosPage from "./todos.page";

const registry: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signin",
    element: <SignInPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/todo",
    element: <TodosPage />
  }
];

export const router = createBrowserRouter(registry);
