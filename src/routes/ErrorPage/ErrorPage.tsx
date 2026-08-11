import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const getErrorMessage = (error: unknown): string => {
  if (isRouteErrorResponse(error)) {
    return error.statusText || String(error.status);
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{getErrorMessage(error)}</i>
      </p>
    </div>
  );
};
