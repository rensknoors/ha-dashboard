import { ReactNode } from 'react';

interface StatRowProps {
  label: string;
  value: ReactNode;
  sublabel?: string;
  icon?: ReactNode;
}

export const StatRow = ({ label, value, sublabel, icon }: StatRowProps) => (
  <div className="flex items-center justify-between gap-3 border-t border-white/8 py-2 first:border-t-0 first:pt-0">
    <div className="flex min-w-0 items-center gap-3">
      {icon}
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {sublabel ? (
          <div className="text-mist-muted truncate text-xs">{sublabel}</div>
        ) : null}
      </div>
    </div>
    <div className="shrink-0 text-sm font-semibold tabular-nums">{value}</div>
  </div>
);
