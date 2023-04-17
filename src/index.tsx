import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// setup MSW.
if (process.env.NODE_ENV === "development") {
  import("./.msw").then((module) => module.clientWorker.start());
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
