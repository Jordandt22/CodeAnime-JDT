import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeLinks from "../../layout/Anime/AnimeLinks";
import OngoingQuery from "./OngoingQuery";

function Ongoing() {
  return (
    <Container className="container anime-page-container">
      <Box className="anime-page__header">
        <h2>Popular Anime</h2>
        <AnimeLinks />
      </Box>

      <OngoingQuery />
    </Container>
  );
}

export default Ongoing;
