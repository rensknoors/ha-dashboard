import clsx from 'clsx';

export type LabelProps = React.HTMLAttributes<HTMLDivElement>;

const Label = ({ children, className }: LabelProps) => {
  return (
    <div
      className={clsx(
        className,
        'rounded-full bg-black px-4 py-2 text-base text-sm font-semibold'
      )}
    >
      {children}
    </div>
  );
};

export { Label };
