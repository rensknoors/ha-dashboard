import { HassConnect } from '@hakit/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from './routes/Router';

const queryClient = new QueryClient();

const App = () => {
  const HASS_URL = import.meta.env.VITE_HASS_URL;
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <HassConnect hassUrl={HASS_URL}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </HassConnect>
    </GoogleOAuthProvider>
  );
};

export { App };
