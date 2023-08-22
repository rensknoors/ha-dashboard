import { useEntity, useHass } from '@hakit/core';
import { BiPause, BiPlay, BiPowerOff } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';

const getSourceThumbnail = (source: string) => {
  switch (source) {
    case 'Netflix':
      return '/src/assets/logos/netflix.jpg';
    case 'Ziggo':
      return '/src/assets/logos/ziggo2.png';
    case 'Plex':
      return '/src/assets/logos/plex.jpg';
  }
};

const MediaCard = ({ entity }: { entity: `media_player.${string}` }) => {
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
      : media.attributes.entity_picture;

  return (
    <Card className="min-h-[180px] flex place-items-center gap-6 relative">
      {/* Background image */}
      <div
        className="z-0 absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg scale-125"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.8), rgba(0,0,0,.8)), url(${thumbnail})`,
        }}
      ></div>

      {/* Thumbnail */}
      <div className="z-10 flex-shrink-0">
        <img src={thumbnail} className="w-20 h-w-20 rounded-2xl bg-black" />
      </div>

      {/* Media info */}
      <div className="z-10 flex flex-grow flex-col gap-2">
        <span className="text-lg font-bold">{title}</span>
        {media.attributes.media_title && (
          <span className="text-base text-ellipsis line-clamp-1">
            {media.attributes.media_title}
          </span>
        )}
      </div>

      {/* Play button */}
      {media.state === 'on' ? (
        <BiPowerOff
          className="z-10 w-14 h-14 flex-shrink-0"
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
          className="z-10 w-14 h-14 flex-shrink-0"
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
