import { ReactNode } from 'react';

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-slate-800 py-4 px-5 rounded-3xl flex flex-col">
      {children}
    </div>
  );
};

export { Card };
