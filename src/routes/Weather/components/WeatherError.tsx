import { BiErrorCircle } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

interface WeatherErrorProps {
  onRetry: () => void;
}

export const WeatherError = ({ onRetry }: WeatherErrorProps) => (
  <div className="flex h-full w-full items-center justify-center">
    <Card className="flex max-w-sm flex-col items-center gap-4 p-8 text-center">
      <IconBadge className="text-danger">
        <BiErrorCircle size={22} />
      </IconBadge>
      <div>
        <h2 className="text-lg font-semibold">Weerbericht niet beschikbaar</h2>
        <p className="text-mist-muted mt-1 text-sm">
          De verwachting kon niet worden opgehaald. Controleer de verbinding en
          probeer het opnieuw.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="bg-surface-elevated cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors active:bg-white/15"
      >
        Opnieuw proberen
      </button>
    </Card>
  </div>
);
