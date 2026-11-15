import { getThumbnailForSource } from './getThumbnailForSource';

type MediaAttributes = {
  friendly_name?: string;
  device_class?: string;
  entity_picture?: string;
  media_artist?: string;
  media_title?: string;
  app_name?: string;
  source?: string;
};

export type MediaDisplay = {
  title: string;
  subtitle: string | undefined;
  /** Either an absolute URL, a local asset or a path on the HA instance. */
  thumbnail: string;
};

// Attributes regularly come through as empty strings, so `??` is not enough.
const firstFilled = (...values: Array<string | undefined>) =>
  values.find((value) => value?.trim());

const isTv = ({ device_class, friendly_name }: MediaAttributes) =>
  device_class === 'tv' || friendly_name === 'Tv';

export const getMediaDisplay = (attributes: MediaAttributes): MediaDisplay => {
  const { media_artist, media_title, app_name, source, friendly_name } =
    attributes;

  const title =
    firstFilled(media_artist, app_name, source, friendly_name) ?? 'Media';
  const subtitle = firstFilled(media_title);

  const thumbnail = isTv(attributes)
    ? getThumbnailForSource(firstFilled(source, app_name))
    : (firstFilled(attributes.entity_picture) ?? getThumbnailForSource());

  return {
    title,
    subtitle: subtitle === title ? undefined : subtitle,
    thumbnail,
  };
};
