import { useEntity, useHass } from '@hakit/core';
import { BiPause, BiPlay } from 'react-icons/bi';

import { Card } from '@/components/atoms/Card/Card';

const MediaCard = ({ entity }: { entity: `media_player.${string}` }) => {
  const media = useEntity(entity);
  const { callService } = useHass();
  const Icon = media.state === 'playing' ? BiPause : BiPlay;

  return (
    <Card className="min-h-[180px] flex place-items-center gap-6 relative">
      {/* Background image */}
      <div
        className="z-0 absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg scale-125"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${media.attributes.entity_picture})`,
        }}
      ></div>

      {/* Thumbnail */}
      <div className="z-10 flex-shrink-0">
        <img
          src={media.attributes.entity_picture}
          className="w-20 h-w-20 rounded-2xl"
        />
      </div>

      {/* Media info */}
      <div className="z-10 flex flex-grow flex-col gap-2">
        <span className="text-xl">
          {media.attributes.media_artist ?? media.attributes.app_name}
        </span>
        <span className="text-ellipsis line-clamp-1">
          {media.attributes.media_title}
        </span>
      </div>

      {/* Play button */}
      <Icon
        className="z-10 w-12 h-12 flex-shrink-0"
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
    </Card>
  );
};

export { MediaCard };
