# Home Assistant dashboard (React + TypeScript + Vite)

This is a personalized dashboard tailored towards my own Home Assistant configuration. This which won't work for other Home Assistant configurations but feel free to use this as inspirations.

## Usage

Add a `.env.local` and/or `.env.production.local` file with `VITE_HASS_URL`. This should contain the url to your Home Assistant environment and is needed for authentication.

Example:

```
# .env.local
VITE_HASS_URL="https://homeassistant.local:8123"
VITE_LATLONG="52.52,13.41"
VITE_TIMEZONE="Europe/Amsterdam"
VITE_HA_LONG_LIVED_TOKEN="abc" # Optional, can be generated in HA at the bottom of your profile screen
```

```
# .env.production.local
VITE_HASS_URL="https://url-to-your-home-assistant-instance.com"
VITE_LATLONG="52.52,13.41"
VITE_TIMEZONE="Europe/Amsterdam"
VITE_HA_LONG_LIVED_TOKEN="abc" # Optional, can be generated in HA at the bottom of your profile screen
```
