import React from "react";

// MUI
import { Container } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

// Components
import EpisodesListSkeleton from "./EpisodesListSkeleton";

function AnimeEpisodesSkeleton() {
  return (
    <>
      <Container className="container anime-eps-container">
        <h1>Episodes</h1>

        <EpisodesListSkeleton />
      </Container>

      {/* Back To Top */}
      <button
        type="button"
        className="btt-btn center"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ArrowUpward className="icon" />
      </button>
    </>
  );
}

export default AnimeEpisodesSkeleton;
