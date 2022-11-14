module.exports = {
  ANIME_KEY: {
    name: "anime",
    params: ["animeSource", "animeSlug"],
    expiresIn: 60 * 60 * 1,
  },
  ANIME_EPISODES_KEY: {
    name: "anime_episodes",
    params: [
      "animeSource",
      "movieID",
      "defaultEp",
      "animeAlias",
      "epSection.ep_start",
      "epSection.ep_end",
    ],
    expiresIn: 60 * 60 * 1,
  },
  ANIME_VIDEO_KEY: {
    name: "anime_video",
    params: ["animeSource", "epSlug"],
    expiresIn: 60 * 60 * 1,
  },
  ANIME_SEARCH_KEY: {
    name: "anime_search",
    params: ["animeSource", "query", "page"],
    expiresIn: 60 * 60 * 1,
  },
  ANIME_RECENT_KEY: {
    name: "anime_recent",
    params: ["animeSource", "page"],
    expiresIn: 60 * 60 * 3,
  },
  ANIME_POPULAR_KEY: {
    name: "anime_popular",
    params: ["animeSource", "page"],
    expiresIn: 60 * 60 * 3,
  },
  ANIME_ONGOING_KEY: {
    name: "anime_ongoing",
    params: ["animeSource", "page"],
    expiresIn: 60 * 60 * 3,
  },
  ANIME_NEW_SEASON_KEY: {
    name: "anime_new_season",
    params: ["animeSource", "page"],
    expiresIn: 60 * 60 * 3,
  },
  ANIME_GENRE_KEY: {
    name: "anime_genre",
    params: ["animeSource", "genreSlug", "page"],
    expiresIn: 60 * 60 * 6,
  },
  ANIME_GENRES_KEY: {
    name: "anime_genres",
    params: ["animeSource"],
    expiresIn: 60 * 60 * 12,
  },
};
