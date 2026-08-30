import { BiErrorCircle } from 'react-icons/bi';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Card } from '@/components/atoms/Card/Card';
import { ROUTES } from '@/routes/routes';

const getErrorMessage = (error: unknown): string => {
  if (isRouteErrorResponse(error)) {
    return error.statusText || String(error.status);
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Onbekende fout';
};

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-[700px] max-h-screen w-screen items-center justify-center p-6">
      <Card className="flex flex-col items-center gap-4 bg-neutral-900 p-8 text-center">
        <BiErrorCircle className="h-12 w-12 text-red-500" />
        <div>
          <h1 className="mb-2 text-xl font-semibold">Er ging iets mis</h1>
          <p className="mb-4 text-gray-400">
            Deze pagina kon niet geladen worden.
          </p>
          <button
            className="rounded-md border border-blue-400 px-4 py-2 text-blue-400 transition-colors hover:bg-blue-400 hover:text-white"
            onClick={() => window.location.assign(ROUTES.HOME)}
          >
            Terug naar begin
          </button>
        </div>
        <p className="text-xs text-slate-400">{getErrorMessage(error)}</p>
      </Card>
    </div>
  );
};
