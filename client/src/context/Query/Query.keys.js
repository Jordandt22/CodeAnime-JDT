export const ONGOING_ANIME_KEY = (page) => `ONGOING_ANIME-PAGE:${page}`;
export const RECENT_ANIME_KEY = (page) => `RECENT_ANIME-PAGE:${page}`;
export const POPULAR_ANIME_KEY = (page) => `POPULAR_ANIME-PAGE_${page}`;
export const NEW_SEASON_ANIME_KEY = (page) => `NEW_SEASON_ANIME-PAGE:${page}`;
export const ANIME_BY_GENRE_KEY = (page, genre) =>
  `ANIME_BY_GENRE:${genre}-PAGE:${page}`;
export const ANIME_GENRES_KEY = () => `ANIME_GENRES`;
