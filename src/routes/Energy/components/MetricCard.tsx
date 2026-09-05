import { ReactNode } from 'react';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sublabel?: string;
}

export const MetricCard = ({
  icon,
  label,
  value,
  sublabel,
}: MetricCardProps) => (
  <Card className="flex items-center gap-4 px-4 py-3">
    <IconBadge size={28}>{icon}</IconBadge>
    <div className="flex min-w-0 flex-col gap-1">
      <div className="text-mist-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
        {label}
      </div>
      <div className="text-2xl leading-tight font-bold tracking-tight tabular-nums">
        {value}
      </div>
      {sublabel ? (
        <div className="text-mist-muted text-xs">{sublabel}</div>
      ) : null}
    </div>
  </Card>
);
