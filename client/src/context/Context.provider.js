import React from "react";

// Contexts
import AnimeSourceContextProvider from "./AnimeSource/AnimeSource.context";
import QueryContextProvider from "./Query/Query.context";
import AnimeListContextProvider from "./AnimeList/AnimeList.context";
import AnimeSpotlightContextProvider from "./Spotlight/Spotlight.context";

function ContextProvider(props) {
  return (
    <AnimeSourceContextProvider>
      <QueryContextProvider>
        <AnimeSpotlightContextProvider>
          <AnimeListContextProvider>{props.children}</AnimeListContextProvider>
        </AnimeSpotlightContextProvider>
      </QueryContextProvider>
    </AnimeSourceContextProvider>
  );
}

export default ContextProvider;
