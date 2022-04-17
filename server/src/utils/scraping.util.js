const cheerio = require("cheerio");
const axios = require("axios");

const getPage = async (url) => {
  if (process.env.NODE_ENV === "development") console.log("Page URL: ", url);

  return await axios
    .get(url)
    .then((response) => {
      if (!response || !response.data)
        return { error: { response: { status: 404 } }, $: null };

      return { error: false, $: cheerio.load(response.data) };
    })
    .catch((err) => {
      if (!err.response) return console.log(err);

      const { status, statusText } = err.response;
      console.log(status, statusText);

      return { error: { response: { status } }, $: null };
    });
};

module.exports = {
  getPage,
  getAnimePage: async (ANIME_URL, slug) => {
    const url = encodeURI(ANIME_URL + slug).trim();
    return await getPage(url);
  },
  scraperErrorHandler: (err) => {
    const status = err.response.status;
    switch (status) {
      case 404:
        return {
          status,
          message: "Sorry, we're unable to find what you were looking for.",
        };

      default:
        return {
          status,
          message: "Sorry, an error occured on the server.",
        };
    }
  },
};
