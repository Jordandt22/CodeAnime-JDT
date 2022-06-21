import React, { createContext, useContext } from "react";

// Watch List Context
const WatchContext = createContext();
export const useWatch = () => useContext(WatchContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const updateWatchList = (updatedWatchList) =>
    localStorage.setItem("WATCH_LIST", JSON.stringify(updatedWatchList));

  const getWatchList = () => JSON.parse(localStorage.getItem("WATCH_LIST"));
  const toggleEpFromWatchList = (animeSlug, epSlug, title, setBtnActive) => {
    const watchListData = getWatchList();
    const watchList = watchListData ? watchListData : {};

    // Add New Anime and Episode
    const animeAdded = watchList[animeSlug];
    if (!animeAdded) {
      const updatedWatchList = watchList;
      updatedWatchList[animeSlug] = { title, eps: [epSlug] };
      setBtnActive(true);
      return updateWatchList(updatedWatchList);
    }

    // Add New Episode
    const epAdded = animeAdded.eps.some((ep) => ep === epSlug);
    if (!epAdded) {
      const updatedWatchList = watchList;
      updatedWatchList[animeSlug] = {
        ...animeAdded,
        eps: [...animeAdded.eps, epSlug],
      };

      setBtnActive(true);
      return updateWatchList(updatedWatchList);
    }

    // Remove Old Episode & Anime (Only If No Episodes Remain)
    const updatedWatchList = watchList;
    updatedWatchList[animeSlug] = {
      ...animeAdded,
      eps: animeAdded.eps.filter((ep) => ep !== epSlug),
    };
    if (updatedWatchList[animeSlug].eps.length === 0)
      delete updatedWatchList[animeSlug];

    setBtnActive(false);
    return updateWatchList(updatedWatchList);
  };
  const checkWatchList = (animeSlug, epSlug) => {
    const watchList = getWatchList();
    if (!watchList) return { active: false };

    const animeAdded = watchList[animeSlug];
    if (!animeAdded) return { active: false };

    const epAdded = animeAdded.eps.some((ep) => ep === epSlug);
    return { active: epAdded };
  };

  return (
    <WatchContext.Provider
      value={{
        getWatchList,
        toggleEpFromWatchList,
        checkWatchList,
      }}
    >
      {props.children}
    </WatchContext.Provider>
  );
};
