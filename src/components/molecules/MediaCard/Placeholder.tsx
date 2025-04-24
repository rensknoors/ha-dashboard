import { BiMusic } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';

export const Placeholder = () => {
  const title = 'Het is stil...';
  const description = 'Er wordt niets afgespeeld';

  return (
    <Card className="flex min-h-[180px] place-items-center gap-6 border !border-gray-700/40 !bg-gray-700/20">
      <div className="flex-shrink-0">
        <BiMusic className="h-14 w-14 rounded-xl text-gray-700" />
      </div>

      <div className="flex flex-grow flex-col">
        <span className="text-lg font-semibold">{title}</span>
        <span className="line-clamp-1 text-ellipsis text-base text-gray-500">
          {description}
        </span>
      </div>
    </Card>
  );
};
