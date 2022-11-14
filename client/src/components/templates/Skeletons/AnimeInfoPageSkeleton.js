import React from "react";

// MUI
import { Container } from "@mui/material";

// Components
import AnimeSpotlightSkeleton from "./AnimeSpotlightSkeleton";
import Vector from "../../pages/Home/Vector";
import AnimeEpisodesSkeleton from "./AnimeEpisodesSkeleton";

function AnimeInfoPageSkeleton() {
  return (
    <Container className="container page-container">
      <AnimeSpotlightSkeleton showGenres={true} secHeaderText="Loading..." />
      <Vector />
      <AnimeEpisodesSkeleton />
    </Container>
  );
}

export default AnimeInfoPageSkeleton;
