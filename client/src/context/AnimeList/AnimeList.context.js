import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Anime List Context
export const AnimeListContext = createContext();
export const useAnimeList = () => useContext(AnimeListContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { pathname } = useLocation();
  const [currentPage, setCurPage] = useState(0);
  const prevPage = () => setCurPage((pg) => (pg <= 0 ? 0 : pg - 1));
  const nextPage = (totalPages) =>
    setCurPage((pg) => (pg >= totalPages - 1 ? totalPages - 1 : pg + 1));

  // Resetting Current Page When Page Changes
  useEffect(() => {
    setCurPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimeListContext.Provider
      value={{
        currentPage,
        setCurPage,
        prevPage,
        nextPage,
      }}
    >
      {props.children}
    </AnimeListContext.Provider>
  );
};
