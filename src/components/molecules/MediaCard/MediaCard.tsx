import { useEntity, useHass } from '@hakit/core';

import { Card } from '@/components/atoms/Card/Card';

const MediaCard = ({ entity }: { entity: `media_player.${string}` }) => {
  const media = useEntity(entity);
  const { callService } = useHass();
  console.log(media);

  return (
    <Card className="min-h-[180px] flex place-items-center gap-6">
      <div className="flex-grow flex-shrink-0">
        <img
          src={media.attributes.entity_picture}
          className="w-20 h-w-20 rounded-2xl"
          alt="media preview"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-xl">{media.attributes.media_artist}</span>
        <span className="text-ellipsis line-clamp-1">
          {media.attributes.media_title}
        </span>
      </div>

      <div
        className="flex flex-col w-8 h-8 flex-shrink-0 bg-red-500 rounded-full"
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
        {'>'}
      </div>
    </Card>
  );
};

export { MediaCard };

// {
//   "entity_id": "media_player.nest_wifi_kantoor",
//   "state": "playing",
//   "attributes": {
//     "device_class": "speaker",
//     "friendly_name": "Nest Wifi kantoor",
//     "supported_features": 152461,
//     "volume_level": 0.10000000149011612,
//     "is_volume_muted": false,
//     "media_content_type": "music",
//     "media_position_updated_at": "2023-08-21T19:57:01.616240+00:00",
//     "app_id": "12F05308",
//     "app_name": "TuneIn Free",
//     "media_content_id": "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO538AAC.aac?dist=tunein&DIST=TuneIn&TGT=TuneIn&maxServers=2&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTY5MjY0NzgxMSwiaXNzIjoidGlzcnYifQ.DtQLgN4OAJ1RAGHBwtmAfJo47ZuL2_9DQ0nLLor7Pdg",
//     "media_position": 1.513839,
//     "media_title": "Luister nu naar Radio 538 via JUKE. Luister live naar Frank Dane en De 538 Ochtend met Tim. Of ontde",
//     "media_artist": "Radio 538",
//     "entity_picture_local": "/api/media_player_proxy/media_player.nest_wifi_kantoor?token=0ef35b0097ee762362944100e5130ca8f1f34ac45fb7261523bc328072fbc9ba&cache=58fa527a830e3a58",
//     "entity_picture": "https://cdn-profiles.tunein.com/s6712/images/logog.jpg?t=636219"
//   },
//   "context": {
//     "id": "01H8CTR49HCT6JTXCTQ6KPNT1J",
//     "parent_id": null,
//     "user_id": null
//   },
//   "last_changed": "2023-08-21T19:57:00.345Z",
//   "last_updated": "2023-08-21T19:57:01.617Z",
//   "custom": {
//     "color": [
//       33,
//       33,
//       33
//     ],
//     "relativeTime": "just now",
//     "active": true,
//     "hexColor": "var(--ha-primary-active)",
//     "rgbColor": "var(--ha-primary-inactive)",
//     "brightness": "brightness(100%)",
//     "brightnessValue": 100,
//     "rgbaColor": "var(--ha-primary-active)"
//   }
// }
