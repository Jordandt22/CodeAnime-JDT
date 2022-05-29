import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeSpotlight from "./AnimeSpotlight";
import Vector from "./Vector";
import RecentAnime from "./AnimeSections/RecentAnime";
import PopularAnime from "./AnimeSections/PopularAnime";
import NewSeasonAnime from "./AnimeSections/NewSeasonAnime";
import AnimeByGenre from "./AnimeByGenre";
import AnimeGenres from "./AnimeGenres";

function Home() {
  return (
    <Container className="container page-container home-container">
      <AnimeSpotlight />
      <Vector />
      <RecentAnime />
      <PopularAnime />
      <NewSeasonAnime />
      <Box className="genre-anime-box between-row">
        <AnimeByGenre
          title="Top Action Anime"
          link="/genre/action"
          genre="action"
        />
        <AnimeByGenre
          title="Top Comedy Anime"
          link="/genre/comedy"
          genre="comedy"
        />
        <AnimeByGenre
          title="Top Slice of Life Anime"
          link="/genre/slice-of-life"
          genre="slice-of-life"
        />
      </Box>
      <AnimeGenres />
    </Container>
  );
}

export default Home;
