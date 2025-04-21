import { EntityName, useEntity, useHass } from '@hakit/core';
import clsx from 'clsx';
import { BiMusic, BiPause, BiPlay, BiPowerOff } from 'react-icons/bi';

import { Card, CardProps } from '@/components/atoms/Card/Card';

export type MediaCardProps = {
  entity: EntityName | 'fallback';
} & CardProps;

const getSourceThumbnail = (source: string) => {
  switch (source) {
    case 'PS5/Switch':
      return '/logos/playstation.svg';
    case 'Youtube':
      return '/logos/youtube.svg';
    case 'Plex':
      return '/logos/plex.svg';
    case 'Spotify':
      return '/logos/spotify.svg';
    case 'Sonos':
      return '/logos/sonos.svg';
    case 'Netflix':
      return '/logos/netflix.svg';
    case 'Videoland':
      return '/logos/videoland.svg';
    case 'NLZIET':
      return '/logos/nlziet.png';
    default:
      return '/cast.svg';
  }
};

const Placeholder = () => {
  const title = 'Het is stil...';
  const description = 'Er wordt niets afgespeeld';

  return (
    <Card className=" flex min-h-[180px] place-items-center gap-6 border border-gray-700 border-opacity-40 bg-gray-700 bg-opacity-20">
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

const MediaCard = ({ entity, className }: MediaCardProps) => {
  const media = useEntity(entity as EntityName, {
    returnNullIfNotFound: true,
  });
  const { callService } = useHass();

  if (!media) return <Placeholder />;

  const PlayPauseIcon = media.state === 'playing' ? BiPause : BiPlay;

  const title =
    media.attributes.media_artist ??
    media.attributes.app_name ??
    media.attributes.source ??
    media.attributes.friendly_name;
  const thumbnail =
    media.attributes.device_class === 'tv' ||
    media.attributes.friendly_name === 'Tv'
      ? getSourceThumbnail(media.attributes.source ?? media.attributes.app_name)
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
      ></div>

      {/* Thumbnail */}
      <div className="z-10 flex-shrink-0">
        <img src={thumbnail} className="h-w-20 w-20 rounded-xl bg-black" />
      </div>

      {/* Media info */}
      <div className="z-10 flex flex-grow flex-col">
        <span className="text-lg font-semibold">{title}</span>
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
