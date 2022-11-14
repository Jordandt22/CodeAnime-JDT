export const ONGOING_ANIME_KEY = (page) => `ONGOING_ANIME-PAGE:${page}`;
export const RECENT_ANIME_KEY = (page) => `RECENT_ANIME-PAGE:${page}`;
export const POPULAR_ANIME_KEY = (page) => `POPULAR_ANIME-PAGE_${page}`;
export const NEW_SEASON_ANIME_KEY = (page) => `NEW_SEASON_ANIME-PAGE:${page}`;
export const ANIME_BY_GENRE_KEY = (page, genre) =>
  `ANIME_BY_GENRE:${genre}-PAGE:${page}`;
export const ANIME_GENRES_KEY = () => `ANIME_GENRES`;
export const SEARCHED_ANIME_KEY = (page, query) =>
  `SEARCHED_ANIME-QUERY:${query}-PAGE:${page}`;
export const ANIME_KEY = (animeSlug) => `ANIME:${animeSlug}`;
export const ANIME_EPISODES_KEY = (epsParams, epSection) => {
  const { animeAlias, defaultEp, movieID } = epsParams;
  const { ep_start, ep_end } = epSection;

  return `ANIME_EPISODES-ANIMEALIAS:${animeAlias}-DEFAULTEP:${defaultEp}-MOVIEID:${movieID}-EPSTART:${ep_start}-EPEND:${ep_end}`;
};
export const ANIME_VIDEO_KEY = (epSlug) => `ANIME-EPSLUG:${epSlug}`;
