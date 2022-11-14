import React, { createContext, useContext, useState } from "react";

// Anime Source Context
export const AnimeSourceContext = createContext();
export const useAnimeSource = () => useContext(AnimeSourceContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const animeSources = [
    {
      label: "Gogoanime",
      url: "gogoanime.sk",
      source: "gogoanime",
    },
  ];
  const [animeSource, setAnimeSource] = useState(animeSources[0]);

  return (
    <AnimeSourceContext.Provider value={{ animeSource }}>
      {props.children}
    </AnimeSourceContext.Provider>
  );
};
