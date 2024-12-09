import { Label } from '@/components/atoms';

export const CustomLabel = ({
  value,
  viewBox,
}: {
  value: number;
  viewBox: { x: number; y: number };
}) => {
  const width = 30;
  // Converts the tariff to cents
  const cents = Math.round(value * 100)
    .toString()
    .replace(/^0+/, ''); // Remove leading zeros

  return (
    <foreignObject
      x={viewBox.x - width / 2}
      y={viewBox.y + 10}
      width={width}
      height={40}
    >
      <Label className="flex justify-center bg-[#4BA66A] bg-none px-1 py-1 font-bold">
        {cents}
      </Label>
    </foreignObject>
  );
};
