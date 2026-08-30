---
name: Renshome Dashboard
description: A black kiosk instrument panel for one home's Home Assistant, read from across the room and touched with a thumb.
colors:
  black: "#000000"
  white-90: "rgba(255, 255, 255, 0.9)"
  slate-800: "#1e293b"
  slate-700: "#334155"
  slate-400: "#94a3b8"
  neutral-900: "#171717"
  neutral-800: "#262626"
  gray-700: "#374151"
  gray-500: "#6b7280"
  blue-300: "#93c5fd"
  blue-400: "#60a5fa"
  green-300: "#86efac"
  green-600: "#16a34a"
  amber-200: "#fde68a"
  orange-300: "#fdba74"
  red-500: "#ef4444"
  tariff-low: "#4BA66A"
  tariff-normal: "#3C5551"
  tariff-high: "#DC6731"
typography:
  display:
    fontFamily: "Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "6rem"
    fontWeight: 600
    lineHeight: 1
  headline:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.1
  title:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.3
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  card-default:
    backgroundColor: "{colors.slate-800}"
    textColor: "{colors.white-90}"
    rounded: "{rounded.xl}"
    padding: "16px"
  card-neutral:
    backgroundColor: "{colors.neutral-900}"
    textColor: "{colors.white-90}"
    rounded: "{rounded.xl}"
    padding: "16px"
  tile-button:
    backgroundColor: "{colors.blue-300}"
    textColor: "#000000"
    rounded: "{rounded.xl}"
    width: "64px"
    height: "64px"
  label-pill:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white-90}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  badge-dot:
    rounded: "{rounded.full}"
    width: "24px"
    height: "24px"
---

# Design System: Renshome Dashboard

## Overview

**Creative North Star: "The Night Console"**

The dashboard is a black instrument panel, not a page. `color-scheme: dark` and a pure black (`#000000`) canvas sit under everything; surfaces don't compete for attention, they recede into slate/neutral tone-steps until a value or a state needs to say something. Color is a signal, not decoration: the sidebar tiles carry one accent hue each so a room-scale glance tells Home from Energy from Weather from Vacuum; a light tile turns warm orange the instant it's on; the tariff trio (green / muted teal / burnt orange) is the one place hue directly encodes a number. Nothing here is trying to look expensive or branded — it's trying to be legible from the couch and forgiving to a thumb.

Built for a wall-mounted kiosk tablet, touched, not clicked, and read from a few meters away — this is the reason for the oversized numerals (`text-8xl` clock), the chunky `rounded-3xl` tiles, and the total absence of small hit targets, hover-only affordances, or dense tabular UI. It is explicitly **not** a SaaS admin dashboard (no tables, no dense sidebars, no 12px captions) and **not** a skeuomorphic/glassy smart-home app (no blur, no glass panels, no decorative gradients beyond the two functional ones: weather sky and light-brightness track).

**Key Characteristics:**
- Pure black canvas; depth from tonal layering only, never shadows.
- One accent hue per section/state, otherwise monochrome.
- Everything sized for a thumb and readable from across the room.
- Motion is slow and ambient (1s color/position fades) or a quick confirm (200ms tap feedback) — never decorative.

## Colors

Near-monochrome black-and-slate base; hue is spent deliberately, one signal at a time.

### Primary
- **Slate 800** (`#1e293b`): the default `Card` surface — the one tone nearly every piece of content sits on.
- **Neutral 900** (`#171717`): a slightly darker, flatter card tone used for secondary stat tiles (Energy, Weather sidebars) so they recede one notch behind the primary content.

### Secondary — section accents (Sidebar tiles)
- **Blue 300** (`#93c5fd`): Home.
- **Green 300** (`#86efac`): Energy.
- **Amber 200** (`#fde68a`): Weather.
- **White**: Vacuum.

Each nav tile is a solid block of its section's hue with a radial dark vignette (`radial-gradient(circle, rgba(0,0,0,.1), rgba(0,0,0,.4))`) at rest; the active route drops the vignette and scales to `105%` instead — color and scale together are the only "you are here" signal, no border, no underline.

### Tertiary — tariff & state colors
- **Tariff Low** (`#4BA66A`): cheapest electricity/gas window — bar chart fill, reference line, badge.
- **Tariff Normal** (`#3C5551`): mid-band tariff — a deliberately muted, almost-neutral teal so "normal" doesn't visually compete with low/high.
- **Tariff High** (`#DC6731`): peak tariff — burnt orange, not alarm-red, since this is a cost signal, not an error.
- **Red 500** (`#ef4444`): reserved for actual errors and the "high" sidebar tariff badge.
- **Green 600** (`#16a34a`): the "low" sidebar tariff badge (distinct from Tariff Low above — the badge uses Tailwind's green-600, the chart uses the bespoke `#4BA66A`; don't merge them).
- **Orange 300** (`#fdba74`): a light's "on" state — falls back to this when the bulb reports no `rgb_color`; when it does, the card background is the bulb's live RGB value directly (the one place a color is dynamic, not a token).

### Neutral
- **Black** (`#000000`): page canvas, `Label` pill background.
- **White 90%** (`rgba(255,255,255,0.9)`): default text color — never pure white.
- **Slate 700 / 400** (`#334155` / `#94a3b8`): modal/tooltip chrome (700) and muted secondary text — timestamps, captions, calendar sub-text (400).
- **Neutral 800** (`#262626`): the tariff-icon tile background, one step lighter than Neutral 900 so the flame/zap glyph tile reads as a distinct control from the stat tiles beside it.
- **Gray 700 / 500** (`#374151` / `#6b7280`): the "nothing playing" media placeholder — deliberately the flattest, least-alive tones in the system.

### Functional weather-code palette (excluded from primitives)
The 7-day forecast icon badges map weather codes to hue categorically (sun→yellow-500, partly-cloudy→blue-400, overcast→gray-500, fog→gray-400, rain→blue-600, snow→blue-200, storm→purple-600). This is a fixed lookup table for meaning, not a reusable design token — don't promote individual entries into the system palette, and don't invent an 8th color for a weather code that doesn't need distinguishing.

### Named Rules
**The One Signal Rule.** A surface gets exactly one reason to have color: its section identity (sidebar tile), its state (light on/off, tariff band), or an error. Never decorate a surface with color it doesn't need to communicate.

**The No-Alarm-Red Rule.** Red (`#ef4444`) is reserved for actual errors and the sidebar's "high tariff" badge. Peak cost itself is burnt orange (`#DC6731`), not red — a cost signal should read as "pay attention," not "something is broken."

## Typography

**Body & Display Font:** Poppins (with `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif` fallback) — the only typeface in the system, loaded at weights 400/600/700.

**Character:** One geometric sans doing every job, from a 96px clock face to a 14px calendar caption. Weight, not typeface, carries the hierarchy: 600 (semibold) is the default emphasis weight for nearly every number and label on screen; 400 is reserved for supporting text; 300 (light) appears exactly once, on the Weather page's hero temperature, as a deliberate softer counterpoint to the otherwise-heavy numeral language.

### Hierarchy
- **Display** (600, 96px / `text-8xl`, line-height 1): the clock — the single largest, most glanceable element in the system.
- **Headline** (300–600, 36–60px / `text-4xl`–`text-6xl`): big readout numbers — energy tariffs/consumption, graph values, the weather hero temperature (the one 300-weight exception).
- **Title** (400, 30px / `text-3xl`): the current date, section-level readouts.
- **Body** (400, 16–20px / `text-base`–`text-xl`): media titles, calendar entries, card copy.
- **Label** (400, 14px / `text-sm`): muted captions, units (`€/kWh`, `kWh`), the `Label` pill component, calendar timestamps.

### Named Rules
**The One Weight Does the Talking Rule.** Hierarchy comes from size and weight (600 vs 400), never from a second typeface. If a new surface needs "more emphasis," reach for size or weight before reaching for a new font.

## Layout

Fixed kiosk canvas, not a responsive page: `Root` is `h-[700px] max-h-screen w-screen` with `p-6` (24px) outer padding — this ships to one known tablet viewport, not a fluid breakpoint system. There are no responsive breakpoints anywhere in the codebase; don't add `sm:`/`md:` variants without confirming the target hardware changed.

**The 24px Rhythm Rule.** `gap-6` (24px) is the default spacing between every major block — sidebar-to-content, card-to-card, section-to-section. `gap-4` (16px) is the one step down, for internal card content (icon-to-label, list rows). Tighter gaps (`gap-1`/`gap-2`, 4–8px) exist only inside a single compact stat (value + unit line).

Structure is a persistent left `Sidebar` (fixed-width column of tiles) plus a flexible content area that arranges its own children in ad-hoc flex/grid per route (2-column stat grids on Home/Energy, a 7-column week strip on Weather) rather than a shared page template — each route composes `Card`s freely inside the 24px rhythm.

**The Ambient vs. Control Rule.** Home is deliberately two-tier, not inconsistent: the left column (`Time`, `CurrentDate`, `WeatherCard`, `CalendarCard`) is *ambient* — read-only, glance-from-across-the-room information — and floats as bare text directly on the black canvas with no `Card` boundary, so the giant clock stays the visual leader rather than being caged. The right column is *control* — things with state or a tap target (`GraphCard`, `MediaCard`, `LightCard`) — and every one of those sits inside a `Card`. The rule going forward: a widget gets a `Card` boundary the moment it has interactive or per-entity state to contain; pure ambient readouts stay unboxed. Don't wrap the left column in `Card` to chase superficial consistency, and don't strip the right column's `Card`s for the same reason — the split itself is the design.

## Elevation & Depth

Flat by design — there is no `box-shadow` anywhere in the codebase. Depth is conveyed entirely by tonal layering against the pure-black canvas: `#000000` page → `#1e293b`/`#171717` card surfaces → `#262626` for a control that needs to read as one step forward again. State depth (a nav tile being "active," a light being "on") is conveyed by color and a `scale(1.05)` transform, never a shadow.

**The Flat-By-Default Rule.** Never add a `box-shadow` to match a "modern card" instinct. If something needs to feel closer to the viewer, lighten its tone or brighten its color — don't lift it.

## Shapes

Everything is heavily rounded and reads as a soft rectangle or a pill — there are no sharp corners in the system.
- **`rounded-3xl` (24px)** is the signature radius: every `Card` and every sidebar `TileButton` uses it. This is the system's single most identifying shape choice.
- **`rounded-xl` (12px)**: the media thumbnail image — one step down for a nested element inside a card.
- **`rounded-lg` (8px)**: chart tooltip, chart bar corners, the weather retry button — utility controls that don't need the full signature radius.
- **`rounded-md` (6px)**: the brightness-slider thumb and its track's inner corner.
- **`rounded-full` (pill)**: the `Label` tag, the `Badge` status dot, the light-brightness track ends, and every weather forecast icon badge — anything meant to read as a chip, dot, or knob.

No borders anywhere except one utility case: the ghost "Retry" button (`border border-blue-400`) and the media placeholder's near-invisible `border-gray-700/40` — border is the exception, not a default framing device.

## Components

### Card
The base surface for everything: `overflow-hidden rounded-3xl bg-slate-800 px-4 py-4`, plus a built-in press interaction (short tap → `onClick`, 1000ms hold → `onLongPress`) baked into the primitive itself, not bolted on per-usage. Route-level code overrides only the background tone (`bg-neutral-900`, `bg-neutral-800`) and padding when a section needs to recede or expand — the shape and interaction model never change. Any `Card` given an `onClick` becomes tappable and gets an immediate `active:scale-[0.97]` press response (150ms, `.card-interactive` in `index.css`) — fast local feedback that a tap registered, independent of the slower HA round-trip that actually changes the entity.

### TileButton (sidebar nav)
- **Shape:** `aspect-square w-16 rounded-3xl` (64×64px) — a chunky, thumb-first nav pill, one per route.
- **Default:** solid section-accent background + a radial dark vignette overlay for a touch of depth without a shadow.
- **Active:** vignette drops, tile scales to `105%` — that's the entire "current page" signal.
- **Badge:** an optional absolutely-positioned dot (top/bottom-right corner) for a live status overlay (the Energy tile's tariff-group indicator).

### Label
A small pill (`rounded-full bg-black px-4 py-2 text-sm`) used for section captions ("Kalender") and inline chart value callouts. Always black-on-content-color, never inherits the parent card's tone — it's meant to read as a tag sitting on top of a surface, not part of it.

### Badge
A plain colored dot (`min-h-6 min-w-6 rounded-full`), positioned absolutely on whatever it's attached to (currently the Energy tile). Color alone carries meaning (green/white/red for tariff band) — no icon, no text needed at this size.

### LightCard (signature component)
The most stateful component in the system: a full card doubles as a toggle. Tap toggles the light; a 1000ms hold opens the detail modal (via `Card`'s built-in long-press). Background flips between `bg-slate-800` (off) and either the bulb's live RGB color or `bg-orange-300` (on, no color reported) over a **1000ms** transition — slow enough to read as an ambient fade, not a UI flash. A brightness bar (`h-4 rounded-lg`, gradient-fill when on) with a small rounded thumb (`rounded-md`) positioned by `left: {brightness}%` visualizes level without a numeric readout.

### GraphCard
A stat tile that layers a large numeral (headline scale) over a bottom-anchored `SvgGraph` sparkline (`absolute bottom-0 left-0 w-full`) — the chart sits behind/under the text rather than beside it, keeping the number legible at a glance while the trend stays visible as ambient texture. Uses the standard `bg-neutral-900` card-neutral tone with default (white 90%) text and `slate-400` for the caption row, matching Energy's stat tiles — it should never be the brightest surface on screen.

## Do's and Don'ts

### Do:
- **Do** keep the canvas pure black (`#000000`) and let card surfaces (`slate-800`/`neutral-900`/`neutral-800`) do all the tonal separation.
- **Do** give each dashboard section exactly one accent hue and reuse it consistently for that section's identity (sidebar tile, related badges).
- **Do** use `rounded-3xl` (24px) for any new primary surface (card, tile) so it matches the system's signature shape.
- **Do** size interactive targets for a thumb, viewed from a few meters — err large, not compact.
- **Do** use slow (~1000ms) transitions for ambient state changes (color, position) and fast (~200ms) transitions for direct tap feedback (scale).

### Don't:
- **Don't** add `box-shadow` anywhere — depth comes from tone, not elevation.
- **Don't** introduce a second typeface or lean on italics/letter-spacing for hierarchy — Poppins weight and size already do that job.
- **Don't** use red for anything other than genuine errors or the "high tariff" badge; peak-cost states use burnt orange (`#DC6731`), not alarm colors.
- **Don't** add responsive breakpoints or a fluid layout without confirming the target device changed — this ships to one fixed kiosk viewport.
- **Don't** promote a one-off functional color (like a single weather-icon hue) into a system-wide token; keep categorical lookups local to the component that needs them.
