import React from "react";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";
import { useAnimeList } from "../../../context/AnimeList/AnimeList.context";

// Components
import AnimeList from "../../layout/Anime/AnimeList";
import AnimeListSkeleton from "../../templates/Skeletons/AnimeListSkeleton";
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function OngoingQuery() {
  const { currentPage } = useAnimeList();
  const { useGetOngoingAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetOngoingAnime(
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
      noneText="Sorry, there aren't any Ongoing Anime available currently."
    />
  );
}

export default OngoingQuery;
