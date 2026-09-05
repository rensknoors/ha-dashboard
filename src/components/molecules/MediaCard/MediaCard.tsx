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
          backgroundImage: `linear-gradient(0deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 70%)), url(${thumbnail})`,
        }}
      />

      {/* Thumbnail */}
      <div className="z-10 shrink-0">
        <img
          src={thumbnail}
          className="rounded-tile bg-surface-elevated h-20 w-20 object-cover"
        />
      </div>

      {/* Media info */}
      <div className="z-10 flex grow flex-col">
        <span className="text-lg font-semibold">{title}</span>
        {media.attributes.media_title && (
          <span className="text-mist-muted line-clamp-1 text-base text-ellipsis">
            {media.attributes.media_title}
          </span>
        )}
      </div>

      {/* Controls */}
      {media.state === 'on' ? (
        <button
          className="bg-mist/10 hover:bg-mist/20 z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
          onClick={() => {
            callService({
              domain: 'media_player',
              service: 'turn_off',
              target: {
                entity_id: entity,
              },
            });
          }}
        >
          <BiPowerOff className="h-6 w-6" />
        </button>
      ) : (
        <button
          className="bg-mist/10 hover:bg-mist/20 z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
          onClick={() => {
            callService({
              domain: 'media_player',
              service: 'media_play_pause',
              target: {
                entity_id: entity,
              },
            });
          }}
        >
          <PlayPauseIcon className="h-7 w-7" />
        </button>
      )}
    </Card>
  );
};

export { MediaCard };
