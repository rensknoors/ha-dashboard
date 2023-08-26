import { ReactNode } from 'react';

export type CardProps = {
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      className={`bg-slate-800 py-4 px-4 rounded-3xl overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { Card };
