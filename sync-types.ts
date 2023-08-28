import { typeSync } from '@hakit/core/sync';

async function runner() {
  await typeSync({
    url: import.meta.env.VITE_HASS_URL,
    token: import.meta.env.VITE_HA_LONG_LIVED_TOKEN,
  });
}
runner();
