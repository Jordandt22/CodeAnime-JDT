import React from "react";

// Contexts
import { useQueryHook } from "../../../../context/Query/Query.context";

// Components
import AnimeSection from "../../../templates/Anime/AnimeSection";

function NewSeasonAnime() {
  const { useGetNewSeasonAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetNewSeasonAnime(1);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <AnimeSection
      title="New Season Anime"
      link="/new-season"
      anime={data?.data?.data?.anime}
    />
  );
}

export default NewSeasonAnime;
