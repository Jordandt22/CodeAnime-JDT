import React from "react";
import { useParams } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeLinks from "../../layout/Anime/AnimeLinks";
import GenreAnimeQuery from "./GenreAnimeQuery";

function GenreAnime() {
  const { genre } = useParams();
  const formatedGenre = genre.toLowerCase().replace(/-/g, " ");

  return (
    <Container className="container anime-page-container">
      <Box className="anime-page__header">
        <h2>Top {formatedGenre} Anime</h2>
        <AnimeLinks />
      </Box>

      <GenreAnimeQuery genre={genre} formatedGenre={formatedGenre} />
    </Container>
  );
}

export default GenreAnime;
