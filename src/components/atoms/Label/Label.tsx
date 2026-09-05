import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type LabelProps = React.HTMLAttributes<HTMLDivElement>;

const Label = ({ children, className }: LabelProps) => {
  return (
    <div
      className={twMerge(
        clsx('rounded-full bg-white px-4 py-2 text-sm text-black', className)
      )}
    >
      {children}
    </div>
  );
};

export { Label };
