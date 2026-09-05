import { Label } from '@/components/atoms';

interface CustomLabelProps {
  value?: unknown;
  viewBox?: { x?: number; y?: number } | Record<string, unknown>;
}

export const CustomLabel = ({ value, viewBox }: CustomLabelProps) => {
  if (
    typeof value !== 'number' ||
    !viewBox ||
    !('x' in viewBox) ||
    typeof viewBox.x !== 'number' ||
    typeof viewBox.y !== 'number'
  ) {
    return null;
  }

  const width = 30;
  // Converts the tariff to cents; strips leading zeros but keeps a lone "0"
  // (dynamic Dutch pricing can land on exactly 0 c/kWh)
  const cents = Math.round(value * 100)
    .toString()
    .replace(/^0+(?=\d)/, '');

  return (
    <foreignObject
      x={viewBox.x - width / 2}
      y={viewBox.y + 10}
      width={width}
      height={40}
    >
      <Label className="bg-tariff-low text-ink flex justify-center px-1 py-1 font-bold">
        {cents}
      </Label>
    </foreignObject>
  );
};
