import { BiErrorCircle } from 'react-icons/bi';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';
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
      <Card className="flex flex-col items-center gap-4 p-8 text-center">
        <IconBadge size={64}>
          <BiErrorCircle className="text-danger h-8 w-8" />
        </IconBadge>
        <div>
          <h1 className="mb-2 text-xl font-semibold">Er ging iets mis</h1>
          <p className="text-mist-muted mb-4">
            Deze pagina kon niet geladen worden.
          </p>
          <button
            className="bg-chip-blue text-chip-blue-fg rounded-full px-5 py-2.5 font-semibold transition-opacity hover:opacity-80"
            onClick={() => window.location.assign(ROUTES.HOME)}
          >
            Terug naar begin
          </button>
        </div>
        <p className="text-mist-muted text-xs">{getErrorMessage(error)}</p>
      </Card>
    </div>
  );
};
