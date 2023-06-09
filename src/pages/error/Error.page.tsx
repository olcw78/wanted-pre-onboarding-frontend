import type { FallbackProps } from "react-error-boundary";
import type { FC } from "react";

const ErrorPage: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Error Has Occurred!</p>
    <pre style={{ color: "red" }}>{error.message}</pre>

    <button type="button" onClick={resetErrorBoundary}>
      <p>reset Error</p>
    </button>
  </div>
);

export default ErrorPage;
