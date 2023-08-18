import { HassConnect } from '@hakit/core';
import { Router } from './routes/Router';

const App = () => {
  const HASS_URL = import.meta.env.VITE_HASS_URL;

  return (
    <HassConnect hassUrl={HASS_URL}>
      <h1 className="text-center text-4xl">React Dashboard</h1>
      <Router />
    </HassConnect>
  );
};

export { App };
