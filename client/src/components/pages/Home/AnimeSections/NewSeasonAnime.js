import React from "react";

// Contexts
import { useQueryHook } from "../../../../context/Query/Query.context";

// Components
import AnimeSection from "../../../templates/Anime/AnimeSection";
import AnimeSectionError from "../../../templates/Errors/AnimeSectionError";
import AnimeSectionSkeleton from "../../../templates/Skeletons/AnimeSectionSkeleton";

function NewSeasonAnime() {
  const { useGetNewSeasonAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetNewSeasonAnime(1);
  const sectionProps = { title: "New Season Anime", link: "/new-season" };

  if (isLoading) {
    return <AnimeSectionSkeleton {...sectionProps} />;
  } else if (isError) {
    return <AnimeSectionError {...sectionProps} message={error.message} />;
  }

  return <AnimeSection {...sectionProps} anime={data?.data?.data?.anime} />;
}

export default NewSeasonAnime;
