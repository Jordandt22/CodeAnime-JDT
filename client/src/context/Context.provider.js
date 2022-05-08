import React from "react";

// Contexts
import AnimeSourceContextProvider from "./AnimeSource/AnimeSource.context";
import QueryContextProvider from "./Query/Query.context";
import SearchContextProvider from "./Search/Search.context";
import AnimeSpotlightContextProvider from "./Spotlight/Spotlight.context";

function ContextProvider(props) {
  return (
    <AnimeSourceContextProvider>
      <QueryContextProvider>
        <AnimeSpotlightContextProvider>
          <SearchContextProvider>{props.children}</SearchContextProvider>
        </AnimeSpotlightContextProvider>
      </QueryContextProvider>
    </AnimeSourceContextProvider>
  );
}

export default ContextProvider;
