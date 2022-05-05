import React from "react";

// Contexts
import { useQueryHook } from "../../../../context/Query/Query.context";

// Components
import AnimeSection from "../../../templates/Anime/AnimeSection";

function RecentAnime() {
  const { useGetRecentAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetRecentAnime(1);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <AnimeSection
      title="Recent Anime"
      link="/recent"
      anime={data?.data?.data?.anime}
    />
  );
}

export default RecentAnime;
