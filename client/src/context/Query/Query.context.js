import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

// API
import {
  getOngoingAnime,
  getRecentAnime,
  getPopularAnime,
  getNewSeasonAnime,
  getAnimeByGenre,
  getAnimeGenres,
  getSearchedAnime,
  getAnime,
  getAnimeEpisodes,
  getAnimeVideo,
} from "../../API/api.js";

// Contexts
import { useAnimeSource } from "../AnimeSource/AnimeSource.context";
import {
  ONGOING_ANIME_KEY,
  RECENT_ANIME_KEY,
  POPULAR_ANIME_KEY,
  NEW_SEASON_ANIME_KEY,
  ANIME_BY_GENRE_KEY,
  ANIME_GENRES_KEY,
  SEARCHED_ANIME_KEY,
  ANIME_KEY,
  ANIME_EPISODES_KEY,
  ANIME_VIDEO_KEY,
} from "./Query.keys";

// Query Context
export const QueryContext = createContext();
export const useQueryHook = () => useContext(QueryContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  // Anime Source
  const {
    animeSource: { source },
  } = useAnimeSource();
  const createKey = (key) => `${source}_${key}`;

  // Query Error
  const [queryError, setQueryError] = useState({
    status: null,
    message: null,
  });

  // API Query
  const useAPIQuery = (key, queryFn, options) =>
    useQuery(key, queryFn, {
      staleTime: 1000 * 60 * 60 * 5,
      keepPreviousData: true,
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      retry: (failureCount, error) => {
        if (failureCount > 3) return false;

        const { status } = error.response;
        let retry = true;
        switch (status) {
          case 403:
          case 401:
          case 404:
          case 400:
          case 422:
          case 429:
            retry = false;
            break;

          default:
            retry = true;
            break;
        }

        return retry;
      },
      retryDelay: (retryCount) => retryCount * 500,
      onError: (error) => {
        const { status, message } = error?.response?.data;
        if (status && message) setQueryError({ status, message });
      },
      ...options,
    });

  // Get Ongoing Anime
  const useGetOngoingAnime = (page) =>
    useAPIQuery(createKey(ONGOING_ANIME_KEY(page)), () =>
      getOngoingAnime(source, { page })
    );

  // Get Recent Anime
  const useGetRecentAnime = (page) =>
    useAPIQuery(createKey(RECENT_ANIME_KEY(page)), () =>
      getRecentAnime(source, { page })
    );

  // Get Popular Anime
  const useGetPopularAnime = (page) =>
    useAPIQuery(createKey(POPULAR_ANIME_KEY(page)), () =>
      getPopularAnime(source, { page })
    );

  // Get New Season Anime
  const useGetNewSeasonAnime = (page) =>
    useAPIQuery(createKey(NEW_SEASON_ANIME_KEY(page)), () =>
      getNewSeasonAnime(source, { page })
    );

  // Get Anime By Genre
  const useGetAnimeByGenre = (page, genre) =>
    useAPIQuery(createKey(ANIME_BY_GENRE_KEY(page, genre)), () =>
      getAnimeByGenre(source, { page, genre })
    );

  // Get Anime Genres
  const useGetAnimeGenres = () =>
    useAPIQuery(createKey(ANIME_GENRES_KEY()), () => getAnimeGenres(source));

  // Get Search Anime
  const useGetSearchedAnime = (page, query) =>
    useAPIQuery(createKey(SEARCHED_ANIME_KEY(page, query)), () =>
      getSearchedAnime(source, { page, query })
    );

  // Get Anime
  const useGetAnime = (animeSlug) =>
    useAPIQuery(createKey(ANIME_KEY(animeSlug)), () =>
      getAnime(source, { animeSlug })
    );

  // Get Anime Episodes
  const useGetAnimeEpisodes = (epsParams, epSection) =>
    useAPIQuery(
      createKey(ANIME_EPISODES_KEY(epsParams, epSection)),
      () => getAnimeEpisodes(source, { epsParams, epSection }),
      { keepPreviousData: false }
    );

  // Get Anime Video
  const useGetAnimeVideo = (epSlug) =>
    useAPIQuery(
      createKey(ANIME_VIDEO_KEY(epSlug)),
      () => getAnimeVideo(source, { epSlug }),
      { keepPreviousData: false }
    );

  return (
    <QueryContext.Provider
      value={{
        queryError,
        useGetOngoingAnime,
        useGetRecentAnime,
        useGetPopularAnime,
        useGetNewSeasonAnime,
        useGetAnimeByGenre,
        useGetAnimeGenres,
        useGetSearchedAnime,
        useGetAnime,
        useGetAnimeEpisodes,
        useGetAnimeVideo,
      }}
    >
      {props.children}
    </QueryContext.Provider>
  );
};
