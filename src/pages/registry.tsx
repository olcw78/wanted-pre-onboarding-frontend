import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import HomePage from "./home.page";
import ErrorRouterPage from "./error/ErrorRouter.page";

const SignInPage = lazy(() => import("./signin.page"));
const SignUpPage = lazy(() => import("./signup.page"));
const TodosPage = lazy(() => import("./todos.page"));

const Registry = () => (
  <Routes>
    <Route path="/" element={<HomePage />} errorElement={<ErrorRouterPage />} />
    <Route
      path="/signin"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      }
      errorElement={<ErrorRouterPage />}
    />
    <Route
      path="/signup"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpPage />
        </Suspense>
      }
      errorElement={<ErrorRouterPage />}
    />
    <Route
      path="/todo"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <TodosPage />
        </Suspense>
      }
      errorElement={<ErrorRouterPage />}
    />
  </Routes>
);
export default Registry;
