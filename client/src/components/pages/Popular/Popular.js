import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeLinks from "../../layout/Anime/AnimeLinks";
import PopularQuery from "./PopularQuery";

function Popular() {
  return (
    <Container className="container anime-page-container">
      <Box className="anime-page__header">
        <h2>Popular Anime</h2>
        <AnimeLinks />
      </Box>

      <PopularQuery />
    </Container>
  );
}

export default Popular;
