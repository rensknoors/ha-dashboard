import { EntityName, useEntity, useHass } from '@hakit/core';
import clsx from 'clsx';
import { BiPause, BiPlay, BiPowerOff } from 'react-icons/bi';

import { Card, CardProps } from '@/components/atoms/Card/Card';
import { getThumbnailForSource } from '@/utils/getThumbnailForSource';

import { Placeholder } from './Placeholder';

export type MediaCardProps = CardProps & {
  entity: EntityName | undefined;
};

const MediaCard = ({ entity, className }: MediaCardProps) => {
  const media = useEntity(entity ?? 'unknown', {
    returnNullIfNotFound: true,
  });
  const callService = useHass((state) => state.helpers.callService);

  if (!entity || !media) return <Placeholder />;

  const PlayPauseIcon = media.state === 'playing' ? BiPause : BiPlay;

  const title =
    media.attributes.media_artist ??
    media.attributes.app_name ??
    media.attributes.source ??
    media.attributes.friendly_name;
  const thumbnail =
    media.attributes.device_class === 'tv' ||
    media.attributes.friendly_name === 'Tv'
      ? getThumbnailForSource(
          media.attributes.source ?? media.attributes.app_name
        )
      : (media.attributes.entity_picture ?? '/cast.svg');

  return (
    <Card
      className={clsx(
        'relative z-0 flex min-h-[180px] place-items-center gap-6',
        className
      )}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 scale-150 bg-cover bg-center bg-no-repeat blur-2xl filter"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${thumbnail})`,
        }}
      />

      {/* Thumbnail */}
      <div className="z-10 shrink-0">
        <img src={thumbnail} className="h-w-20 w-20 rounded-xl bg-black" />
      </div>

      {/* Media info */}
      <div className="z-10 flex grow flex-col">
        <span className="text-lg font-semibold">{title}</span>
        {media.attributes.media_title && (
          <span className="line-clamp-1 text-base text-ellipsis">
            {media.attributes.media_title}
          </span>
        )}
      </div>

      {/* Controls */}
      {media.state === 'on' ? (
        <BiPowerOff
          className="z-10 box-content h-8 w-8 shrink-0 cursor-pointer p-8"
          onClick={() => {
            callService({
              domain: 'media_player',
              service: 'turn_off',
              target: {
                entity_id: entity,
              },
            });
          }}
        />
      ) : (
        <PlayPauseIcon
          className="z-10 h-14 w-14 shrink-0 cursor-pointer"
          onClick={() => {
            callService({
              domain: 'media_player',
              service: 'media_play_pause',
              target: {
                entity_id: entity,
              },
            });
          }}
        />
      )}
    </Card>
  );
};

export { MediaCard };
