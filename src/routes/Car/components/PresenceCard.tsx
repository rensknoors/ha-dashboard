import { useEntity } from '@hakit/core';
import { BiCurrentLocation } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';
import { IconBadge } from '@/components/atoms/IconBadge/IconBadge';

const locationLabel = (state: string) =>
  state === 'home' ? 'Thuis' : state === 'not_home' ? 'Onderweg' : state;

/** Deliberately not a map: distance/time-to-arrival only shows up while
 * actively navigating, so it's honest about not having a live route to draw. */
const PresenceCard = () => {
  const location = useEntity('device_tracker.tesla_model_3_location');
  const distance = useEntity('sensor.tesla_model_3_distance_to_arrival');
  const timeToArrival = useEntity('sensor.tesla_model_3_time_to_arrival');

  const isNavigating =
    distance.state !== 'unavailable' &&
    distance.state !== 'unknown' &&
    Number(distance.state) > 0;

  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
      <IconBadge size={48}>
        <BiCurrentLocation className="h-5 w-5" />
      </IconBadge>
      <span className="text-lg font-semibold">
        {locationLabel(location.state)}
      </span>
      {isNavigating && (
        <span className="text-mist-muted text-sm">
          {distance.state} {distance.attributes.unit_of_measurement ?? 'km'} ·
          nog {timeToArrival.state} min
        </span>
      )}
    </Card>
  );
};

export { PresenceCard };
