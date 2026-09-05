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
  <Card className="flex items-center gap-4 px-5 py-4">
    <IconBadge size={40}>{icon}</IconBadge>
    <div className="min-w-0">
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
