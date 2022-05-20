import React from "react";
import { useParams } from "react-router-dom";

// MUI
import { Container } from "@mui/material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";

// Components
import AnimeInfo from "./AnimeInfo";
import AnimeEpisodes from "./AnimeEpisodes";
import Vector from "../Home/Vector";
import ErrorMessage from "../../layout/Errors/ErrorMessage";
import AnimeInfoPageSkeleton from "../../templates/Skeletons/AnimeInfoPageSkeleton";

function Anime() {
  const { animeSlug } = useParams();
  const { useGetAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetAnime(animeSlug);

  if (isLoading) {
    return <AnimeInfoPageSkeleton />;
  } else if (isError) {
    return (
      <Container className="container page-container anime-info-container">
        <ErrorMessage message={error.message} />
      </Container>
    );
  }

  return (
    <Container className="container page-container anime-info-container">
      <AnimeInfo data={data?.data?.data} />
      <Vector />
      <AnimeEpisodes data={data?.data?.data} />
    </Container>
  );
}

export default Anime;
