import { ReactNode } from 'react';

import { Card, CardVariant } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

const mutedText: Record<CardVariant, string> = {
  surface: 'text-mist-muted',
  panel: 'text-ink-muted',
};

const iconTone: Record<CardVariant, string | undefined> = {
  surface: undefined,
  panel: 'bg-ink/8 text-ink',
};

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sublabel?: string;
  variant?: CardVariant;
}

export const MetricCard = ({
  icon,
  label,
  value,
  sublabel,
  variant = 'surface',
}: MetricCardProps) => (
  <Card variant={variant} className="flex items-center gap-4 px-4 py-3">
    <IconBadge size={28} className={iconTone[variant]}>
      {icon}
    </IconBadge>
    <div className="flex min-w-0 flex-col gap-1">
      <div
        className={`${mutedText[variant]} text-[11px] font-semibold tracking-[0.12em] uppercase`}
      >
        {label}
      </div>
      <div className="text-2xl leading-tight font-bold tracking-tight tabular-nums">
        {value}
      </div>
      {sublabel ? (
        <div className={`${mutedText[variant]} text-xs`}>{sublabel}</div>
      ) : null}
    </div>
  </Card>
);
