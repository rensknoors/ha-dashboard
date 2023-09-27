import { EntityName, useEntity } from '@hakit/core';

import { Card, CardProps } from '@/components/atoms/Card/Card';
import { Label } from '@/components/atoms/Label/Label';

export type GraphCardProps = {
  entity: EntityName;
  unit?: string;
} & CardProps;

const GraphCard = ({ entity, unit }: GraphCardProps) => {
  const { state, attributes, custom } = useEntity(entity);

  return (
    <Card className="flex flex-col place-items-start bg-slate-300 text-black">
      <Label className="mb-6 text-slate-300">{attributes.friendly_name}</Label>
      <span className="text-4xl font-semibold">
        {`${state} ${unit ?? attributes.unit_of_measurement}`}
      </span>
      <span className="">{custom.relativeTime}</span>
    </Card>
  );
};

export { GraphCard };
