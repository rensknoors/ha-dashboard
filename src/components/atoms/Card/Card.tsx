import { ReactNode } from 'react';

export type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-slate-800 py-4 px-6 rounded-3xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export { Card };
