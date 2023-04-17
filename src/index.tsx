import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { AuthContextProvider } from "./state/auth/auth.state";
import Layout from "layout";
import Registry from "./pages/registry";
import ErrorPage from "./pages/error/Error.page";

// setup MSW.
if (process.env.NODE_ENV === "development") {
  import("./.msw").then((module) =>
    module.clientWorker.start({
      onUnhandledRequest(req, print) {
        const regex = /.(png|ico)/;
        if (regex.test(req.url.pathname)) {
          return;
        }

        print.warning();
      }
    })
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <BrowserRouter>
        <AuthContextProvider>
          <Layout>
            <Registry />
          </Layout>
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
