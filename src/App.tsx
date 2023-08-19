import { HassConnect } from '@hakit/core';
import { Router } from './routes/Router';

const App = () => {
  const HASS_URL = import.meta.env.VITE_HASS_URL;

  return (
    <HassConnect hassUrl={HASS_URL}>
      <Router />
    </HassConnect>
  );
};

export { App };
