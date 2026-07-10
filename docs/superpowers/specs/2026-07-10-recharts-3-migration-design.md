# Recharts 3 Migration Design

## Goal

Bring `renovate/recharts-3.x` up to date with `origin/main` and complete the Energy chart migration to Recharts 3.8.1, including deprecated APIs and relevant new v3 APIs.

## Scope

- Merge `origin/main` into the existing Renovate branch without rewriting history.
- Keep Recharts at 3.8.1 and regenerate the Bun lockfile against the merged dependency set.
- Migrate the only Recharts consumer, `EnergyChart`, from deprecated `Cell` children to a typed `Bar.shape` implementation using `Rectangle`.
- Bind the chart components with `createHorizontalChart<TariffDatum, string, number>()` so data keys and axis value types are checked.
- Replace `ResponsiveContainer` with the Recharts 3.3+ `responsive` chart prop and explicit chart dimensions.
- Use automatic Y-axis width calculation.
- Type the custom tooltip with `TooltipContentProps<number, string>` and support the v3 label and payload types.
- Retain Recharts 3's default accessibility layer.

## Architecture

`EnergyChart` owns a `TariffDatum` type and a small custom bar-shape component. Recharts supplies geometry and payload data to that shape; the component preserves Recharts' rectangle props while deriving the fill color from the datum's tariff. A typed horizontal chart context wraps the Recharts primitives used by the chart.

The shared tooltip remains a presentational component. Its public props use Recharts' exported tooltip-content type rather than a local approximation, preventing drift when Recharts changes payload or label optionality.

## Behavior

- Chart height remains 500 pixels and width remains responsive to its parent.
- Bars retain their width, rounded corners, and tariff-derived colors.
- Axes, currency formatting, tooltip styling, and lowest-tariff reference lines remain visually and functionally unchanged.
- Keyboard accessibility remains enabled through Recharts 3's default behavior.

## Error Handling

The custom tooltip renders nothing when inactive or when payload/label data is unavailable. The custom bar shape falls back to Recharts' supplied fill if a payload is unavailable, avoiding invalid geometry or color output during animation.

## Testing

- Add focused tests that render the custom tooltip for valid and absent Recharts payload data.
- Add a focused chart test that verifies tariff-colored bar shapes are rendered.
- Run the complete unit suite, TypeScript type-check, lint, and production build.

## Non-Goals

- Redesigning the Energy page or chart visuals.
- Adopting unrelated Recharts features such as portals, custom z-indexes, or controlled tooltip indices.
- Refactoring tariff calculations unrelated to the migration.
