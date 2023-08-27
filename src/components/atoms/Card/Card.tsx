import { ReactNode } from 'react';

export type CardProps = {
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, style, onClick }: CardProps) => {
  return (
    <div
      className={`overflow-hidden rounded-3xl bg-slate-800 px-4 py-4 ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { Card };
