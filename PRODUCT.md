# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Rens and household (partner/family) at home. Viewed on a wall-mounted tablet, kiosk-style, touch, read from a few meters away — not a desktop app. Job: glance at time/weather/calendar, monitor energy tariff and room temps, control lights and media, and check/control the Tesla Model 3's charging and climate, without opening the generic Home Assistant app or the Tesla app.

## Product Purpose

Personal control panel over Rens's own Home Assistant instance. Replaces HA's default dashboard with a curated, glanceable, always-on view tailored to this specific home.

## Positioning

Not a general-purpose HA dashboard: hardcoded to Rens's own entities, floor plan, and tariff provider (Zonneplan). README states explicitly this won't work for other HA configs — it's a personal build shared as inspiration, not a reusable product.

## Operating Context

- Wall-mounted tablet, kiosk mode, touch input, viewed from a few meters away.
- Connects to a self-hosted Home Assistant instance via `VITE_HASS_URL` (+ optional long-lived token).
- Current surfaces: Home (time, date, weather, calendar, room temp graphs incl. nursery, media player, light groups), Energy (tariff/usage), Weather (incl. near-term rain nowcast), Car.
- Car replaces the former Vacuum stub: controls the household's Tesla Model 3 (`tesla_custom` HACS integration, entity ids `*.tesla_model_3_*`) — charging start/stop and limit, battery/range/time-to-full, climate preconditioning and seat/wheel heaters, security (lock, sentry, frunk/trunk/windows), location/arrival.
- No vacuum entity is in scope; the physical Roborock S8 exists in HA (`vacuum.roborock_s8` family) but has no dashboard surface by choice.

## Capabilities and Constraints

- Built on `@hakit/core` + `@hakit/components` (Home Assistant React toolkit) — entities are read/controlled through hakit, not raw HA REST/WebSocket calls.
- Tailwind v4 + Emotion-free plain CSS; dark-only theme (`color-scheme: dark`), Onest font (replaced Poppins in the 2026-08-31 redesign).
- Entities referenced directly by id in code (e.g. `light.kitchen_group`, `sensor.living_room_temperature`) — not user-configurable, tied to Rens's install.
- react-router-dom for the four routes; Sidebar as persistent nav (tile buttons with mdi icons).

## Brand Commitments

Named "Renshome Dashboard" (browser tab title). Redesigned (2026-08-31) from the original flat "Night Console" system to a dark glassmorphic bento world, pinned by the user against a reference image ("match feel, not content" — no literal room photography, greeting text, or media-player content from the reference; the material language — charcoal bento tiles, a warm off-white contrast panel, soft elevation, circular icon badges, pastel glass stat chips — carries over). See DESIGN.md for the built system of record.

## Evidence on Hand

No design mockups beyond the one user-supplied reference image (used for aesthetic direction only, not asset content) and what's in-repo (weather Lottie animations, mdi icon set). No stock or generated photography is used — this is a personal kiosk, not a showroom; real data (live entity states, real weather) stands in for the reference's photographic mood.

## Product Principles

1. Glanceable over dense — info readable from a few meters, at a glance, not read closely.
2. Touch-first, kiosk-first — no keyboard/mouse assumptions; targets sized for a wall tablet.
3. Personal over generic — optimize for this exact home and these exact entities, not configurability.
4. Always-on calm — dashboard sits idle most of the time; avoid noisy/attention-grabbing motion.

## Accessibility & Inclusion

Household includes non-technical users (family) doing simple tasks (lights, media) via touch — controls should stay obvious and forgiving at a glance, not require HA domain knowledge.

Confirmed out of scope: formal accessibility support (screen-reader, keyboard-only navigation, WCAG contrast/ARIA compliance). This is an in-home touch-only kiosk for one household; no member needs those access modes. Don't raise this as a finding in future critiques/audits.
