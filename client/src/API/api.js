import Axios from "axios";

// URLS
const { REACT_APP_SERVER_URI } = process.env;
const getAnimeURI = (animeSource) =>
  REACT_APP_SERVER_URI + "/api/anime/" + animeSource;

// GET - Ongoing Anime
export const getOngoingAnime = async (animeSource, { page }) =>
  await Axios.get(getAnimeURI(animeSource) + `/ongoing/page/${page}`);

// GET - Recent Anime
export const getRecentAnime = async (animeSource, { page }) =>
  await Axios.get(getAnimeURI(animeSource) + `/recent/page/${page}`);

// GET - Popular Anime
export const getPopularAnime = async (animeSource, { page }) =>
  await Axios.get(getAnimeURI(animeSource) + `/popular/page/${page}`);

// GET - New Season Anime
export const getNewSeasonAnime = async (animeSource, { page }) =>
  await Axios.get(getAnimeURI(animeSource) + `/new-season/page/${page}`);

// GET - Anime By Genre
export const getAnimeByGenre = async (animeSource, { page, genre }) =>
  await Axios.get(getAnimeURI(animeSource) + `/genre/${genre}/page/${page}`);

// GET - Anime Genres
export const getAnimeGenres = async (animeSource) =>
  await Axios.get(getAnimeURI(animeSource) + `/genres`);