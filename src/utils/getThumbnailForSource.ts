export const getThumbnailForSource = (source: string) => {
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
    case 'Odido':
      return '/logos/odido.svg';
    case 'NLZIET':
      return '/logos/nlziet.png';
    default:
      return '/cast.svg';
  }
};
