import { useEntity } from '@hakit/core';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type LightCardProps = {
  entity: `light.${string}`;
} & CardProps;

const LightCard = ({ entity, className }: LightCardProps) => {
  const light = useEntity(entity);
  console.log(light);
  return (
    <Card className={`${className} min-h-[120px] flex flex-col`}>
      <div>{light.state}</div>
      <div>{light.attributes.friendly_name}</div>
      {light.attributes.brightness && (
        <div>{light.attributes.brightness / 2.55 + '%'}</div>
      )}
    </Card>
  );
};

export { LightCard };
