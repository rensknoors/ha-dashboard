import { useHass } from '@hakit/core';
import clsx from 'clsx';
import { BiPause, BiPlay, BiPowerOff } from 'react-icons/bi';

import { Card, CardProps } from '@/components/atoms/Card/Card';
import { MediaPlayer } from '@/hooks/useActiveMediaPlayer';
import { getMediaDisplay } from '@/utils/media/getMediaDisplay';

import { Placeholder } from './Placeholder';

export type MediaCardProps = CardProps & {
  player: MediaPlayer | undefined;
};

// Artwork served by Home Assistant is a path relative to the HA instance.
const isHassPath = (url: string) => url.startsWith('/api/');

const MediaCard = ({ player, className }: MediaCardProps) => {
  const callService = useHass((state) => state.helpers.callService);
  const joinHassUrl = useHass((state) => state.helpers.joinHassUrl);

  if (!player) return <Placeholder />;

  const { title, subtitle, thumbnail } = getMediaDisplay(player.attributes);
  const thumbnailUrl = isHassPath(thumbnail)
    ? joinHassUrl(thumbnail)
    : thumbnail;

  // A device that is merely switched on has nothing to play or pause.
  const isOn = player.state === 'on';
  const isPlaying = player.state === 'playing' || player.state === 'buffering';
  const ControlIcon = isOn ? BiPowerOff : isPlaying ? BiPause : BiPlay;
  const controlLabel = isOn
    ? 'Uitschakelen'
    : isPlaying
      ? 'Pauzeren'
      : 'Afspelen';

  const handleControl = () => {
    void callService({
      domain: 'media_player',
      service: isOn ? 'turn_off' : 'media_play_pause',
      target: { entity_id: player.entity_id },
    });
  };

  return (
    <Card
      className={clsx(
        'relative z-0 flex min-h-45 place-items-center gap-6 border-0',
        className
      )}
    >
      <div
        className="absolute inset-0 z-0 scale-150 bg-cover bg-center bg-no-repeat blur-2xl filter"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.6), rgba(0,0,0,.6)), url("${thumbnailUrl}")`,
        }}
      />

      <div className="z-10 shrink-0">
        <img
          src={thumbnailUrl}
          alt=""
          className="h-20 w-20 rounded-xl bg-black object-cover"
        />
      </div>

      <div className="z-10 flex min-w-0 grow flex-col">
        <span className="line-clamp-1 text-lg font-semibold">{title}</span>
        {subtitle && (
          <span className="line-clamp-1 text-base text-ellipsis">
            {subtitle}
          </span>
        )}
      </div>

      <button
        type="button"
        aria-label={controlLabel}
        className="z-10 shrink-0 cursor-pointer"
        onClick={handleControl}
      >
        <ControlIcon
          className={isOn ? 'box-content h-8 w-8 p-8' : 'h-14 w-14'}
        />
      </button>
    </Card>
  );
};

export { MediaCard };
