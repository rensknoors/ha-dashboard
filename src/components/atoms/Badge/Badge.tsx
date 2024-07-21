import { twMerge } from 'tailwind-merge';

type BadgeProps = {
  text?: string;
} & Partial<HTMLDivElement>;

const Badge = ({ text, className }: BadgeProps) => {
  return (
    <div className={twMerge('min-h-6 min-w-6 rounded-full px-2', className)}>
      {text}
    </div>
  );
};

export { Badge };
