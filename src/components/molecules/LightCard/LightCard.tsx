import { useEntity } from '@hakit/core';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type LightCardProps = {
  entity: `light.${string}`;
} & CardProps;

const LightCard = ({ entity }: LightCardProps) => {
  const light = useEntity(entity);
  console.log(light);
  return <Card>{light.state}</Card>;
};

export { LightCard };
