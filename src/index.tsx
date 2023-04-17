import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "pages/registry";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "pages/Error.page";
import { AuthContextProvider } from "./state/auth/auth.state";

// setup MSW.
if (process.env.NODE_ENV === "development") {
  import("./.msw").then((module) => module.clientWorker.start());
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ErrorBoundary>
  </StrictMode>
);
