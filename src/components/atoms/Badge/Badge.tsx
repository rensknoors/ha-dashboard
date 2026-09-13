import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type BadgeProps = {
  text?: string;
  className?: string;
};

const Badge = ({ text, className }: BadgeProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          text
            ? 'flex min-h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] leading-none font-bold'
            : 'min-h-2.5 min-w-2.5 rounded-full px-1'
        ),
        className
      )}
    >
      {text}
    </div>
  );
};

export { Badge };
