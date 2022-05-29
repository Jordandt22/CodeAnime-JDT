import React from "react";

// Contexts
import AnimeSourceContextProvider from "./AnimeSource/AnimeSource.context";
import QueryContextProvider from "./Query/Query.context";
import AnimeListContextProvider from "./AnimeList/AnimeList.context";
import AnimeSpotlightContextProvider from "./Spotlight/Spotlight.context";
import GlobalContextProvider from "./Global/Global.context";

function ContextProvider(props) {
  return (
    <GlobalContextProvider>
      <AnimeSourceContextProvider>
        <QueryContextProvider>
          <AnimeSpotlightContextProvider>
            <AnimeListContextProvider>
              {props.children}
            </AnimeListContextProvider>
          </AnimeSpotlightContextProvider>
        </QueryContextProvider>
      </AnimeSourceContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
