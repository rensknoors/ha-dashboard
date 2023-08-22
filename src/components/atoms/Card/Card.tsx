import { ReactNode } from 'react';

export type CardProps = {
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`min-h-[180px] bg-slate-800 py-4 px-6 rounded-3xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export { Card };
