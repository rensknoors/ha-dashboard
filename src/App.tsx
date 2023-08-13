import { HassConnect } from '@hakit/core';

const App = () => {
  const HASS_URL = import.meta.env.VITE_HASS_URL;

  return (
    <HassConnect hassUrl={HASS_URL}>
      <div></div>
    </HassConnect>
  );
};

export default App;
