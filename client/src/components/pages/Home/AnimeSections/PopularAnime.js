import React from "react";

// Contexts
import { useQueryHook } from "../../../../context/Query/Query.context";

// Components
import AnimeSection from "../../../templates/Anime/AnimeSection";

function PopularAnime() {
  const { useGetPopularAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetPopularAnime(1);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <AnimeSection
      title="Popular Anime"
      link="/popular"
      anime={data?.data?.data?.anime}
    />
  );
}

export default PopularAnime;
