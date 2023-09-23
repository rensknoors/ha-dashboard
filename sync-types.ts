import { typeSync } from '@hakit/core/sync';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV, process.cwd());

async function runner() {
  await typeSync({
    url: env.VITE_HASS_URL,
    token: env.VITE_HA_LONG_LIVED_TOKEN,
  });
}
runner();
