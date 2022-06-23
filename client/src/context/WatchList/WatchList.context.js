import React, { createContext, useContext } from "react";

// Watch List Context
const WatchContext = createContext();
export const useWatch = () => useContext(WatchContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  // Update Watch List
  const updateWatchList = (updatedWatchList) =>
    localStorage.setItem("WATCH_LIST", JSON.stringify(updatedWatchList));

  // Get Watch List
  const getWatchList = () => {
    const data = JSON.parse(localStorage.getItem("WATCH_LIST"));
    return data ? data : {};
  };

  // Toggle Episode
  const toggleEpFromWatchList = (
    animeSlug,
    episodeInfo,
    title,
    setBtnActive
  ) => {
    const { epSlug } = episodeInfo;
    const watchList = getWatchList();
    const ep = { ...episodeInfo };

    // Add New Anime and Episode
    const animeAdded = watchList[animeSlug];
    if (!animeAdded) {
      const updatedWatchList = watchList;
      updatedWatchList[animeSlug] = { animeSlug, title, eps: [ep] };
      setBtnActive(true);
      return updateWatchList(updatedWatchList);
    }

    // Add New Episode
    const epAdded = animeAdded.eps.some((ep) => ep.epSlug === epSlug);
    if (!epAdded) {
      const updatedWatchList = watchList;
      updatedWatchList[animeSlug] = {
        ...animeAdded,
        eps: [...animeAdded.eps, ep],
      };

      setBtnActive(true);
      return updateWatchList(updatedWatchList);
    }

    // Remove Old Episode & Anime (Only If No Episodes Remain)
    const updatedWatchList = watchList;
    updatedWatchList[animeSlug] = {
      ...animeAdded,
      eps: animeAdded.eps.filter((ep) => ep.epSlug !== epSlug),
    };
    if (updatedWatchList[animeSlug].eps.length === 0)
      delete updatedWatchList[animeSlug];

    setBtnActive(false);
    return updateWatchList(updatedWatchList);
  };

  // Check Watch List
  const checkWatchList = (animeSlug, epSlug) => {
    const watchList = getWatchList();
    const animeAdded = watchList[animeSlug];
    if (!animeAdded) return { active: false };

    const epAdded = animeAdded.eps.some((ep) => ep.epSlug === epSlug);
    return { active: epAdded };
  };

  // Remove Anime
  const removeAnimeFromWatchList = (animeSlug, setWatchListData) => {
    const watchList = getWatchList();
    const animeAdded = watchList[animeSlug];
    if (!animeAdded) return;

    const updatedWatchList = watchList;
    delete updatedWatchList[animeSlug];

    setWatchListData(watchList);
    return updateWatchList(updatedWatchList);
  };

  return (
    <WatchContext.Provider
      value={{
        getWatchList,
        toggleEpFromWatchList,
        checkWatchList,
        removeAnimeFromWatchList,
      }}
    >
      {props.children}
    </WatchContext.Provider>
  );
};
