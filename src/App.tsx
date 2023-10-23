import { HassConnect } from '@hakit/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from './routes/Router';

const queryClient = new QueryClient();

const App = () => {
  const HASS_URL = import.meta.env.VITE_HASS_URL;

  return (
    <HassConnect hassUrl={HASS_URL}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </HassConnect>
  );
};

export { App };
