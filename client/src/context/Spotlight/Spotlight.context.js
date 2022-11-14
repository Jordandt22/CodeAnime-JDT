import React, { createContext, useContext, useState } from "react";

// Anime Spotlight
export const AnimeSpotlightContext = createContext();
export const useAnimeSpotlight = () => useContext(AnimeSpotlightContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const totalSpotlights = 5;
  const [currentAnime, setCurrentAnime] = useState(0);
  const prevAnime = () =>
    setCurrentAnime((curAni) => {
      if (curAni <= 0) return totalSpotlights - 1;
      return curAni - 1;
    });
  const nextAnime = () =>
    setCurrentAnime((curAni) => {
      if (curAni >= totalSpotlights - 1) return 0;
      return curAni + 1;
    });

  return (
    <AnimeSpotlightContext.Provider
      value={{ currentAnime, totalSpotlights, prevAnime, nextAnime }}
    >
      {props.children}
    </AnimeSpotlightContext.Provider>
  );
};
