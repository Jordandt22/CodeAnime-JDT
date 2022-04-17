module.exports = {
  anime: {
    formatAnimeData: (
      slug,
      title,
      otherName,
      image,
      summary,
      type,
      released,
      status,
      genres,
      epsParams,
      epSections,
      totalEps
    ) => ({
      slug,
      title,
      otherName,
      image,
      summary,
      type,
      released,
      status,
      genres,
      episodes: {
        epsParams,
        epSections,
        totalEps: Number(totalEps),
      },
    }),
    formatEpsSection: (ep_start, ep_end) => ({
      ep_start,
      ep_end,
    }),
  },
  episodes: {
    formatAnimeEpsData: (episodes, epSection, epsParams) => ({
      episodes,
      epSection,
      epsParams,
    }),
    formatEpData: (slug, num, lang) => ({
      slug,
      num,
      lang,
    }),
  },
  video: {
    formatAnimeVideoData: (
      epSlug,
      animeSlug,
      title,
      src,
      type,
      prev,
      next,
      videoSources
    ) => ({
      epSlug,
      animeSlug,
      title,
      video: {
        src,
        type,
        prev,
        next,
      },
      videoSources,
    }),
    formatVideoSourceData: (src, name) => ({
      src,
      name,
    }),
  },
  search: {
    formatSearchData: (search, totalPages) => ({ search, totalPages }),
  },
  recent: {
    formatRecentData: (image, epSlug, title, subText) => ({
      image,
      epSlug,
      title,
      subText: subText.trim(),
    }),
  },
  list: {
    formatAnimeListData: (image, animeSlug, title, subText) => ({
      image,
      animeSlug,
      title,
      subText: subText.trim(),
    }),
  },
  ongoing: {
    formatOngoingAnime: (
      image,
      animeSlug,
      title,
      subText,
      epSlug,
      latestEp
    ) => ({
      image,
      animeSlug,
      title,
      subText: subText.trim(),
      epSlug,
      latestEp,
    }),
  },
};
