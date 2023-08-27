import { useEntity, useHass } from '@hakit/core';
import { BiPause, BiPlay, BiPowerOff } from 'react-icons/bi';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type MediaCardProps = {
  entity: `media_player.${string}`;
} & CardProps;

const getSourceThumbnail = (source: string) => {
  switch (source) {
    case 'Netflix':
      return '/src/assets/logos/netflix.jpg';
    case 'Ziggo':
      return '/src/assets/logos/ziggo.png';
    case 'Plex':
      return '/src/assets/logos/plex.jpg';
  }
};

const MediaCard = ({ entity }: MediaCardProps) => {
  const media = useEntity(entity);
  const { callService } = useHass();
  const PlayPauseIcon = media.state === 'playing' ? BiPause : BiPlay;

  const title =
    media.attributes.media_artist ??
    media.attributes.app_name ??
    media.attributes.source ??
    media.attributes.friendly_name;
  const thumbnail =
    media.attributes.device_class === 'tv'
      ? getSourceThumbnail(media.attributes.source)
      : media.attributes.entity_picture ?? '/src/assets/cast.png';

  return (
    <Card className="relative flex min-h-[180px] place-items-center gap-6">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 scale-125 bg-cover bg-center bg-no-repeat blur-lg filter"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.8), rgba(0,0,0,.8)), url(${thumbnail})`,
        }}
      ></div>

      {/* Thumbnail */}
      <div className="z-10 flex-shrink-0">
        <img src={thumbnail} className="h-w-20 w-20 rounded-2xl bg-black" />
      </div>

      {/* Media info */}
      <div className="z-10 flex flex-grow flex-col gap-2">
        <span className="text-lg font-bold">{title}</span>
        {media.attributes.media_title && (
          <span className="line-clamp-1 text-ellipsis text-base">
            {media.attributes.media_title}
          </span>
        )}
      </div>

      {/* Controls */}
      {media.state === 'on' ? (
        <BiPowerOff
          className="z-10 box-content h-8 w-8 flex-shrink-0 cursor-pointer p-8"
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
          className="z-10 h-14 w-14 flex-shrink-0 cursor-pointer"
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
