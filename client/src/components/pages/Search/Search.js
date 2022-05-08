import React from "react";
import { useParams } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";

// Components
import AnimeLinks from "../../layout/Anime/AnimeLinks";
import SearchQuery from "./SearchQuery";

function Search() {
  const { query } = useParams();

  return (
    <Container className="container search-container">
      <Box className="search__header">
        <h2>Search Results for "{query}"</h2>
        <AnimeLinks />
      </Box>

      <SearchQuery query={query} />
    </Container>
  );
}

export default Search;
