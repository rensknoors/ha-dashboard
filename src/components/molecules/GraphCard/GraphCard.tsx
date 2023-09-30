import { SvgGraph } from '@hakit/components';
import { EntityName, useEntity } from '@hakit/core';

import { Card, CardProps } from '@/components/atoms/Card/Card';
import { Label } from '@/components/atoms/Label/Label';

export type GraphCardProps = {
  entity: EntityName;
  label?: string;
  unit?: string;
} & CardProps;

const GraphCard = ({ entity, label, unit }: GraphCardProps) => {
  const { state, attributes, custom, history } = useEntity(entity);

  return (
    <Card className="relative flex flex-col place-items-start bg-slate-400 text-black">
      <Label className="mb-6 text-slate-400">
        {label ?? attributes.friendly_name}
      </Label>
      <span className="text-4xl font-semibold">
        {`${state} ${unit ?? attributes.unit_of_measurement}`}
      </span>
      <span className="text-sm">{custom.relativeTime}</span>
      <div className="absolute bottom-0 left-0">
        {history.loading ? (
          <span>Loading...</span>
        ) : (
          <SvgGraph coordinates={history.coordinates} strokeWidth={2} />
        )}
      </div>
    </Card>
  );
};

export { GraphCard };
