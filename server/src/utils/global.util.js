module.exports = {
  formatData: (animeSource, data) => ({
    animeSource,
    data,
  }),
  formatSlug: (slug) => slug.trim().replace("/", ""),
};
