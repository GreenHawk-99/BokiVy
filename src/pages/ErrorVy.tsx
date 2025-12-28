import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export default function ErrorVy() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  let status: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    status = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div id={"error-page"}>
      <h1>{status}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}