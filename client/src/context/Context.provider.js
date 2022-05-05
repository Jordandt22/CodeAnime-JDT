import React from "react";

// Contexts
import AnimeSourceContextProvider from "./AnimeSource/AnimeSource.context";
import QueryContextProvider from "./Query/Query.context";
import AnimeSpotlightContextProvider from "./Spotlight/Spotlight.context";

function ContextProvider(props) {
  return (
    <AnimeSourceContextProvider>
      <QueryContextProvider>
        <AnimeSpotlightContextProvider>
          {props.children}
        </AnimeSpotlightContextProvider>
      </QueryContextProvider>
    </AnimeSourceContextProvider>
  );
}

export default ContextProvider;
