import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import HomePage from "./home.page";
import ErrorRouterPage from "./error/ErrorRouter.page";

const SignInPage = lazy(() => import("./signin.page"));
const SignUpPage = lazy(() => import("./signup.page"));
const TodosPage = lazy(() => import("./todos.page"));

const Registry = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
        errorElement={<ErrorRouterPage />}
      />
      <Route
        path="/signin"
        element={<SignInPage />}
        errorElement={<ErrorRouterPage />}
      />
      <Route
        path="/signup"
        element={<SignUpPage />}
        errorElement={<ErrorRouterPage />}
      />
      <Route
        path="/todo"
        element={<TodosPage />}
        errorElement={<ErrorRouterPage />}
      />
    </Routes>
  </Suspense>
);
export default Registry;
