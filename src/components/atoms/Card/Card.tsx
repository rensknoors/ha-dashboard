import { ReactNode } from 'react';

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`bg-slate-800 py-4 px-6 rounded-3xl ${className}`}>
      {children}
    </div>
  );
};

export { Card };
