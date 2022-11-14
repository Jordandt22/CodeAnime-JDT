import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeLinks from "../../layout/Anime/AnimeLinks";
import NewSeasonQuery from "./NewSeasonQuery";

function NewSeason() {
  return (
    <Container className="container anime-page-container">
      <Box className="anime-page__header">
        <h2>New Season Anime</h2>
        <AnimeLinks />
      </Box>

      <NewSeasonQuery />
    </Container>
  );
}

export default NewSeason;
