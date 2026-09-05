---
name: Renshome Dashboard
description: A dark glassmorphic bento control panel for one home's Home Assistant and Tesla, read from across the room and touched with a thumb.
colors:
  canvas: "#0b0b0d"
  surface: "#18181c"
  surface-elevated: "#232328"
  panel: "#eeece6"
  ink: "#1a1a1c"
  ink-muted: "#6f6d73"
  mist: "rgb(255 255 255 / 92%)"
  mist-muted: "#97959d"
  chip-pink: "#f4d9ea"
  chip-pink-fg: "#b6467e"
  chip-blue: "#d9e6f7"
  chip-blue-fg: "#3b6ea5"
  chip-green: "#dcefe0"
  chip-green-fg: "#3f8557"
  chip-amber: "#f6e8cf"
  chip-amber-fg: "#a97a2b"
  tariff-low: "#4ba66a"
  tariff-normal: "#3c5551"
  tariff-high: "#dc6731"
  danger: "#ef4444"
typography:
  display:
    fontFamily: "Onest, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  tile: "1.25rem"
  bento: "1.75rem"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.mist}"
    rounded: "{rounded.bento}"
    padding: "24px"
  card-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bento}"
    padding: "24px"
  icon-badge:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.full}"
    width: "44px"
    height: "44px"
  stat-chip-pink:
    backgroundColor: "{colors.chip-pink}"
    textColor: "{colors.chip-pink-fg}"
    rounded: "{rounded.tile}"
    padding: "12px 16px"
  stat-chip-blue:
    backgroundColor: "{colors.chip-blue}"
    textColor: "{colors.chip-blue-fg}"
    rounded: "{rounded.tile}"
    padding: "12px 16px"
---

# Design System: Renshome Dashboard

## Overview

**Creative North Star: "The Charcoal Bento"**

Redesigned 2026-08-31, replacing the prior flat "Night Console" system on the user's own pinned brief (a reference image: "match feel, not content") plus new scope — a Tesla Model 3 control screen and expanded room sensors. The old look is kept only as evidence of what worked functionally (touch-first sizing, the tariff-color domain logic, the light-card-as-live-color idea); its visual language — pure black, zero elevation, tonal-only depth — is retired, not extended.

The new world tiles the dashboard as a bento grid: charcoal (`#18181c`) cards of varying sizes on a near-black canvas, each carrying a soft, real drop shadow rather than the old system's flat tonal steps. Exactly one warm, light contrast panel (`#eeece6`, near-black text) anchors each screen as its "hero" — the clock on Home, the battery on Car — mirroring the reference's single light panel amid dark satellites. Circular dark icon badges and soft pastel glass chips (blush pink, powder blue, sage green, warm amber — never a solid saturated block) carry every discrete value, replacing the old system's raw Tailwind-default accent tiles. No stock or generated photography is used anywhere — this is real household data, not a showroom; color and glow do the job the reference's photography did.

**Key Characteristics:**
- One hero light panel per screen; every other surface is charcoal.
- Depth comes from a real, soft shadow now, not tonal layering alone.
- Every discrete stat lives in a pastel glass chip, one color, one meaning.
- Circular icon badges are the one recurring "chrome" motif, everywhere.
- Zero literal reuse of the reference's content (no photography, no borrowed copy) — only its material language.

## Colors

Charcoal-dominant with one warm light panel and soft pastel chip accents; still near-monochrome, but materially warmer and softer than the old pure-black/slate world.

### Primary
- **Surface** (`#18181c`): the one charcoal tone for every card — this system does not tone-step (no separate "recessed" surface); size and content carry hierarchy, not darkness.
- **Panel** (`#eeece6`): the single warm light contrast surface per screen, paired with near-black `ink` text. Used exactly once per view (Home's clock, Car's battery) — never more, never as a general card option.

### Secondary — pastel glass chips
- **Chip Pink** (`#f4d9ea` / fg `#b6467e`): decorative pastel, no fixed domain meaning (e.g. Energy's consumption chip).
- **Chip Blue** (`#d9e6f7` / fg `#3b6ea5`): decorative pastel or "normal" tariff band; also the system's link/retry-button color.
- **Chip Green** (`#dcefe0` / fg `#3f8557`): decorative pastel or "low" tariff band.
- **Chip Amber** (`#f6e8cf` / fg `#a97a2b`): decorative pastel, "high" tariff band, and a light's "on" fallback fill.

Every stat on screen lives in exactly one of these — a card's own charcoal tone never doubles as a value's background.

### Tertiary — functional domain colors (carried forward unchanged)
- **Tariff Low/Normal/High** (`#4ba66a` / `#3c5551` / `#dc6731`): real Zonneplan price-band colors — unchanged from the prior system, because they're a functional signal, not a decorative choice. Used on the icon tile and the reference-line callout on the Energy chart; the sidebar/chip presentation of the *same* tariff group uses the pastel chip trio (green/blue/amber) instead — two presentations of one signal, not two competing colors.
- **Danger** (`#ef4444`): genuine errors only.

### Neutral
- **Canvas** (`#0b0b0d`): page background.
- **Mist / Mist Muted** (`rgb(255 255 255 / 92%)` / `#97959d`): default text and muted secondary text on charcoal surfaces.
- **Ink / Ink Muted** (`#1a1a1c` / `#6f6d73`): default text and muted secondary text on the warm light panel — never reuse `mist` on `panel`, or `ink` on `surface`.
- **Surface Elevated** (`#232328`): the one-step-lighter tone reserved for icon badges and chip-toned tile backgrounds, never a card background on its own.

### Named Rules
**The One Hero Rule.** Exactly one `panel` (light) card per screen. A second light panel on the same view means the hierarchy hasn't been decided yet.

**The Chip, Not the Card Rule.** A discrete stat (a temperature, a percentage, a currency value) gets a pastel chip. A card's own background is never the value's color-carrier — that's what the old system did; this one separates "container" from "value."

**The No-Alarm-Red Rule.** Red (`#ef4444`) stays reserved for genuine errors. Peak tariff cost is amber, not red — a cost signal reads "pay attention," not "something is broken."

## Typography

**Font:** Onest (with `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif` fallback), weights 400–800. Replaces the prior system's Poppins — a warmer, more geometric-rounded grotesk chosen to match the reference's numeral character while staying a workhorse UI face, not a display statement.

**Character:** Bold weight (700) is the default emphasis for anything glanceable — the clock, stat values, section headers — with 500 for supporting body text and 600 for compact uppercase labels. No italic, no light weights (the prior system's one 300-weight exception on the weather hero is retired along with the rest of that world).

### Hierarchy
- **Display** (700, ~72px / `text-7xl`): the two heroes only — Home's clock, Car's battery percentage.
- **Headline** (700, 36–60px / `text-4xl`–`text-6xl`): big readouts — weather temp, Energy tariff values, chart figures.
- **Title** (600, 18–20px): card section headers ("Klimaat", "Kalender").
- **Body** (500, 16px): card copy, list rows, toggle labels.
- **Label** (600, 12–14px, uppercase, tracked): chip captions, muted units.

### Named Rules
**The Bold-First Rule.** Reach for weight (500→700) before reaching for size to add emphasis inside a card; size is reserved for the display/headline roles above.

## Layout

Same fixed kiosk canvas as the prior system: `Root` is `h-[700px] max-h-screen w-screen` at `p-6`, no responsive breakpoints — one known tablet viewport. `gap-6` (24px) remains the default rhythm between every major block.

**The Bento Tiling Rule.** Every screen is a grid of `rounded-bento` (28px) tiles of deliberately varied size and shape — never a uniform grid of equal cards. A screen with every tile the same size and shape hasn't found its hero yet.

**The Hero-Plus-Satellites Rule.** Structure each screen as one large hero panel (see Colors → The One Hero Rule) plus a cluster of smaller charcoal satellites around it — Home's clock + weather/calendar column, Car's battery + presence row. Don't spread emphasis evenly across equal-weight cards.

## Elevation & Depth

Real, soft elevation — the opposite of the prior "Flat-By-Default" system. Every card carries a soft, wide, low-opacity shadow (`0 24px 48px -28px rgb(0 0 0 / 65%)` on charcoal, a lighter equivalent on the warm panel) that reads as lifted off the canvas, not tonal-only depth.

**The Soft Lift Rule.** Shadows are wide, soft, and low-contrast — never a hard offset, never a glow/neon edge. A shadow that reads as a distinct outline rather than an ambient lift is the wrong shadow for this world.

## Shapes

Large, consistent rounding, slightly bigger than the prior system's already-generous radius.
- **`rounded-bento` (28px)**: every card, the signature shape.
- **`rounded-tile` (20px)**: nested elements — stat chips, media thumbnails, sidebar nav tiles.
- **`rounded-full`**: icon badges, toggle switches, pill buttons, status dots.

No borders anywhere; separation comes from tone, elevation, and generous gutter — never a stroke.

## Components

### Card
Two variants via a `variant` prop: `surface` (default, charcoal, `bg-surface`) and `panel` (the one warm hero per screen, `bg-panel`). Both carry the same built-in press/long-press interaction as before; `variant="panel"` additionally flips text color to `ink`. A `Card` with an `onClick` gets `.card-interactive` — an immediate `active:scale-[0.97]` press response, unchanged from the prior system.

### IconBadge
A circular `surface-elevated` holder, default 44px, for every icon in the system — nav tiles, card headers, toggle rows. The one recurring "chrome" motif that ties every card together.

### StatChip
A pastel glass tile (`tone`: pink/blue/green/amber) carrying one icon + value + uppercase label. The system's atomic "one stat, one color" unit — used for Energy's tariff/consumption/cost figures, the nursery's temp/humidity, and Car's charging stats.

### TileButton (sidebar nav)
64px-down-to-56px square, `rounded-tile`. Plain muted icon at rest; the active route gets a solid pastel chip fill (one tone per route: Home=pink, Energy=green, Weather=blue, Car=amber) plus a `scale-105` — replacing the prior system's saturated Tailwind-default tile colors with the same pastel vocabulary used everywhere else.

### ToggleRow (Car screen)
A tap-to-toggle list row — icon badge, label, and an iOS-style pill switch (amber when on). Backs every switch-domain Tesla control (charge, sentry, defrost, auto-seat/wheel heat). Introduced this redesign; not present in the prior system.

### LightCard (signature component, carried forward)
Still the most stateful component: a full card doubles as a light toggle, background flips to the bulb's live RGB color (or the `chip-amber` pastel as fallback) over a 1000ms transition, with a brightness bar. The live-RGB idea survives the redesign unchanged — it was correctly identified as the system's one truly distinctive interaction, not tied to either visual world.

### EnergyChart (signature component, carried forward)
The touch-scrub bar chart (drag or hover to reveal a scrub-line + magnified tariff readout) survives unchanged in behavior; only its surrounding chrome (tooltip surface, scrub-line color) was retinted to the new tokens.

## Do's and Don'ts

### Do:
- **Do** give every screen exactly one `panel` hero and keep everything else `surface`.
- **Do** put a discrete stat in a pastel `StatChip`, never as a card's own background color.
- **Do** use `rounded-bento` (28px) for cards and `rounded-tile` (20px) for nested elements — keep the two radii distinct.
- **Do** carry the tariff domain colors (`tariff-low/normal/high`) forward unchanged wherever the actual price band is shown; use the pastel chip trio for everything else tariff-related.
- **Do** give every card a soft, wide shadow — flat cards are the retired world, not this one.

### Don't:
- **Don't** revert to flat, shadowless cards or the old pure-black/slate tonal-step system — that world was replaced, not extended.
- **Don't** use more than one `panel` (light) card per screen.
- **Don't** use a saturated Tailwind-default color (e.g. `bg-blue-300`) anywhere a pastel chip tone or a domain color already covers the need.
- **Don't** use red for anything but a genuine error; peak tariff cost is amber.
- **Don't** add stock or AI-generated photography — this is real household data standing in for the reference's photographic mood, not a showroom.
