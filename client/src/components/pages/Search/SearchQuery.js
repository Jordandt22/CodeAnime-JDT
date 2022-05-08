import React from "react";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";
import { useSearch } from "../../../context/Search/Search.context";

// Components
import AnimeList from "../../layout/Anime/AnimeList";
import AnimeListSkeleton from "../../templates/Skeletons/AnimeListSkeleton";
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function SearchQuery(props) {
  const { query } = props;
  const { currentPage } = useSearch();
  const { useGetSearchedAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetSearchedAnime(
    currentPage + 1,
    query.toLowerCase().replace(/ /g, "_")
  );

  if (isLoading) {
    return <AnimeListSkeleton />;
  } else if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  const { search, totalPages } = data.data.data;
  return (
    <AnimeList
      anime={search}
      totalPages={totalPages}
      noneText={`Sorry, we couldn't find any anime for "${query}".`}
    />
  );
}

export default SearchQuery;
