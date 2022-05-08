import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeLinks from "../../layout/Anime/AnimeLinks";
import RecentQuery from "./RecentQuery";

function Recent() {
  return (
    <Container className="container anime-page-container">
      <Box className="anime-page__header">
        <h2>Recent Anime</h2>
        <AnimeLinks />
      </Box>

      <RecentQuery />
    </Container>
  );
}

export default Recent;
