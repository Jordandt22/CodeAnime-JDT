const { ANIMIXPLAY: ANIMIXPLAY_URL } = require("../../config/urls");
const { getPage } = require("../../utils/scraping.util");

module.exports = {
  getAnimeScraper: async (slug) => {
    const page = await getPage(ANIMIXPLAY_URL, slug);

    return { html: page.html() };
  },
};
