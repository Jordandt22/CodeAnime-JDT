import React, { createContext, useContext, useState } from "react";

// Search Context
export const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [currentPage, setCurPage] = useState(0);
  const prevPage = () => setCurPage((pg) => (pg <= 0 ? 0 : pg - 1));
  const nextPage = (totalPages) =>
    setCurPage((pg) => (pg >= totalPages - 1 ? totalPages - 1 : pg + 1));

  return (
    <SearchContext.Provider
      value={{
        currentPage,
        setCurPage,
        prevPage,
        nextPage,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
