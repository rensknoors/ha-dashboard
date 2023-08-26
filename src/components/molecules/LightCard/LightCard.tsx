import { useEntity, useIconByEntity } from '@hakit/core';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type LightCardProps = {
  entity: `light.${string}`;
} & CardProps;

const LightCard = ({ entity, className }: LightCardProps) => {
  const light = useEntity(entity);
  const icon = useIconByEntity(entity);

  return (
    <Card
      className={`${className} min-h-[120px] flex flex-col cursor-pointer`}
      onClick={() => light.api.toggle()}
    >
      <div>{icon}</div>
      <div className="flex-1">{light.attributes.friendly_name}</div>
      <div className="w-full h-4 bg-slate-700 rounded-lg"></div>
      {light.attributes.brightness && (
        <div>{light.attributes.brightness / 2.55 + '%'}</div>
      )}
    </Card>
  );
};

export { LightCard };
