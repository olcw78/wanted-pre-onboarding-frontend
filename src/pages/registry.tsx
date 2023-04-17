import { Route, Routes } from "react-router-dom";
import HomePage from "./home.page";

import SignInPage from "./signIn.page";
import SignUpPage from "./signup.page";
import TodosPage from "./todos.page";
import ErrorRouterPage from "./error/ErrorRouter.page";

const Registry = () => (
  <Routes>
    <Route path="/" element={<HomePage />} errorElement={<ErrorRouterPage />} />
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
);
export default Registry;
