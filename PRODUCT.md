# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Rens and household (partner/family) at home. Viewed on a wall-mounted tablet, kiosk-style, touch, read from a few meters away — not a desktop app. Job: glance at time/weather/calendar, monitor energy tariff and room temps, control lights and media, and (planned) run the vacuum, without opening the generic Home Assistant app.

## Product Purpose

Personal control panel over Rens's own Home Assistant instance. Replaces HA's default dashboard with a curated, glanceable, always-on view tailored to this specific home.

## Positioning

Not a general-purpose HA dashboard: hardcoded to Rens's own entities, floor plan, and tariff provider (Zonneplan). README states explicitly this won't work for other HA configs — it's a personal build shared as inspiration, not a reusable product.

## Operating Context

- Wall-mounted tablet, kiosk mode, touch input, viewed from a few meters away.
- Connects to a self-hosted Home Assistant instance via `VITE_HASS_URL` (+ optional long-lived token).
- Current surfaces: Home (time, date, weather, calendar, room temp graphs, media player, light groups), Energy (tariff/usage), Weather, Vacuum.
- Vacuum route is a known stub (unbuilt Hakit boilerplate placeholder) — backlog, not yet designed.

## Capabilities and Constraints

- Built on `@hakit/core` + `@hakit/components` (Home Assistant React toolkit) — entities are read/controlled through hakit, not raw HA REST/WebSocket calls.
- Tailwind v4 + Emotion-free plain CSS; dark-only theme (`color-scheme: dark`), Poppins font.
- Entities referenced directly by id in code (e.g. `light.kitchen_group`, `sensor.living_room_temperature`) — not user-configurable, tied to Rens's install.
- react-router-dom for the four routes; Sidebar as persistent nav (tile buttons with mdi icons).

## Brand Commitments

Named "Renshome Dashboard" (browser tab title). No formal brand system beyond the existing dark/Poppins visual language already in code.

## Evidence on Hand

No design mockups, testimonials, or external assets beyond what's in-repo (weather Lottie animations, mdi icon set). Treat current implementation as the visual baseline.

## Product Principles

1. Glanceable over dense — info readable from a few meters, at a glance, not read closely.
2. Touch-first, kiosk-first — no keyboard/mouse assumptions; targets sized for a wall tablet.
3. Personal over generic — optimize for this exact home and these exact entities, not configurability.
4. Always-on calm — dashboard sits idle most of the time; avoid noisy/attention-grabbing motion.

## Accessibility & Inclusion

Household includes non-technical users (family) doing simple tasks (lights, media) via touch — controls should stay obvious and forgiving at a glance, not require HA domain knowledge.

Confirmed out of scope: formal accessibility support (screen-reader, keyboard-only navigation, WCAG contrast/ARIA compliance). This is an in-home touch-only kiosk for one household; no member needs those access modes. Don't raise this as a finding in future critiques/audits.
