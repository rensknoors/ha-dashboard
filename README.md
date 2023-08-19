# Home Assistant dashboard (React + TypeScript + Vite)

This is a personalized dashboard tailored towards my own Home Assistant configuration. This which won't work for other Home Assistant configurations but feel free to use this as inspirations.

## Usage

Add a `.env.local` and/or `.env.production.local` file with `VITE_HASS_URL`. This should contain the url to your Home Assistant environment and is needed for authentication.

Example:

```
# .env.local
VITE_HASS_URL="https://homeassistant.local:8123"
```

```
# .env.production.local
VITE_HASS_URL="https://url-to-your-home-assistant-instance.com"
```

## Deploy

1. In Homeassistant: Install and setup the Terminal & SSH addon, this is very easy!

   - Click on your "Profile name" in your HA dashboard
   - Scroll down and enabled "Advanced mode"
   - Go to Settings -> Addons -> search for "Terminal & SSH" -> Install
   - Go to the configuration tab, enter a password into the field and save
   - Ensure the PORT is 22, save, the default username is `root`

2. Add an `.env` file with the following environment variables:

```
SSH_USERNAME="root"
SSH_PASSWORD="password"
SSH_HOSTNAME="ip or hostname"
```

3. Run the deploy command:

```zsh
pnpm run deploy
```
