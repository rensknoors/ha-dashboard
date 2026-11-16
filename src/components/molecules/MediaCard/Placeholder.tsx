import { BiMusic } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

export const Placeholder = () => {
  const title = 'Het is stil...';
  const description = 'Er wordt niets afgespeeld';

  return (
    <Card className="flex min-h-45 place-items-center gap-6">
      <IconBadge size={56} className="text-mist-muted">
        <BiMusic size={26} />
      </IconBadge>

      <div className="flex grow flex-col">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-mist-muted line-clamp-1 text-base text-ellipsis">
          {description}
        </span>
      </div>
    </Card>
  );
};
