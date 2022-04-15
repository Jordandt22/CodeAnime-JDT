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
};
