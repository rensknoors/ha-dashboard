import { HassConnect } from '@hakit/core';

function App() {
  const HASS_URL = 'https://192.168.86.61:8123';

  return (
    <HassConnect hassUrl={HASS_URL}>
      <div></div>
    </HassConnect>
  );
}

export default App;
