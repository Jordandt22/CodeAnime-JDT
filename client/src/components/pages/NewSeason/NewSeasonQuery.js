import React from "react";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";
import { useAnimeList } from "../../../context/AnimeList/AnimeList.context";

// Components
import AnimeList from "../../layout/Anime/AnimeList";
import AnimeListSkeleton from "../../templates/Skeletons/AnimeListSkeleton";
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function NewSeasonQuery() {
  const { currentPage } = useAnimeList();
  const { useGetNewSeasonAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetNewSeasonAnime(
    currentPage + 1
  );

  if (isLoading) {
    return <AnimeListSkeleton />;
  } else if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  const { anime, totalPages } = data.data.data;
  return (
    <AnimeList
      anime={anime}
      totalPages={totalPages}
      noneText="Sorry, there aren't any New Season Anime available currently."
    />
  );
}

export default NewSeasonQuery;
