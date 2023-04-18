import { useRouteError } from "react-router-dom";
import type { FC } from "react";

const ErrorRouterPage: FC = () => {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div id="errr-page">
      <h1>Error Occurred!</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
export default ErrorRouterPage;
