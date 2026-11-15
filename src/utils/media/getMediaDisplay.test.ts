import { describe, expect, it } from 'vitest';

import { getMediaDisplay } from './getMediaDisplay';

describe('getMediaDisplay', () => {
  it('shows artist, track and artwork for a speaker', () => {
    const result = getMediaDisplay({
      friendly_name: 'Nest Hub',
      device_class: 'speaker',
      media_artist: 'Massive Attack',
      media_title: 'Unfinished Sympathy',
      app_name: 'Spotify',
      entity_picture: '/api/media_player_proxy/media_player.nest_hub',
    });

    expect(result).toEqual({
      title: 'Massive Attack',
      subtitle: 'Unfinished Sympathy',
      thumbnail: '/api/media_player_proxy/media_player.nest_hub',
    });
  });

  it('falls back past empty attributes', () => {
    const result = getMediaDisplay({
      friendly_name: 'Nest Hub',
      media_artist: '',
      media_title: 'Jouw Hits, Jouw 538',
      app_name: ' ',
    });

    expect(result.title).toBe('Nest Hub');
    expect(result.subtitle).toBe('Jouw Hits, Jouw 538');
    expect(result.thumbnail).toBe('/cast.svg');
  });

  it('uses the source logo for a tv', () => {
    const result = getMediaDisplay({
      friendly_name: 'LG C8',
      device_class: 'tv',
      source: 'Netflix',
      entity_picture: '/api/media_player_proxy/media_player.lg_c8',
    });

    expect(result).toEqual({
      title: 'Netflix',
      subtitle: undefined,
      thumbnail: '/logos/netflix.svg',
    });
  });

  it('does not repeat the title as subtitle', () => {
    const result = getMediaDisplay({
      app_name: 'YouTube',
      media_title: 'YouTube',
    });

    expect(result.subtitle).toBeUndefined();
  });
});
