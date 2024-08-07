import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type LabelProps = React.HTMLAttributes<HTMLDivElement>;

const Label = ({ children, className }: LabelProps) => {
  return (
    <div
      className={twMerge(
        clsx('rounded-full bg-black px-4 py-2 text-sm', className)
      )}
    >
      {children}
    </div>
  );
};

export { Label };
