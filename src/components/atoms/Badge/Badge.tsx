import { twMerge } from 'tailwind-merge';

type BadgeProps = {
  text?: string;
} & Partial<HTMLDivElement>;

const Badge = ({ text, className }: BadgeProps) => {
  return (
    <div
      className={twMerge('min-h-2.5 min-w-2.5 rounded-full px-1', className)}
    >
      {text}
    </div>
  );
};

export { Badge };
