import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeCardSkeleton from "./AnimeCardSkeleton";

function AnimeListSkeleton() {
  return (
    <Container className="container anime-list-container center-vertical">
      <Box className="anime-list-grid">
        {[...Array(20)].map((_, i) => {
          return <AnimeCardSkeleton key={i + "-search-card-skel"} />;
        })}
      </Box>
    </Container>
  );
}

export default AnimeListSkeleton;
