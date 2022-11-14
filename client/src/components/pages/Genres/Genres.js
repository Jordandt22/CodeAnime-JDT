import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";

// Components
import GenresSkeleton from "../../templates/Skeletons/GenresSkeleton";
import GenresError from "../../templates/Errors/GenresError";

function Genres() {
  const { useGetAnimeGenres } = useQueryHook();
  const { isLoading, isError, error, data } = useGetAnimeGenres();

  if (isLoading) {
    return <GenresSkeleton />;
  } else if (isError) {
    return <GenresError message={error.message} />;
  }

  const { genres } = data.data.data;
  return (
    <Container className="container page-container genres-container">
      <h2 className="genres__title">List of Genres</h2>

      <Box className="genres__list">
        {genres.map((genre) => {
          const { genreSlug, genre: genreName } = genre;

          return (
            <NavLink
              key={genreSlug}
              to={`/genre/${genreSlug}`}
              className="list__genre"
            >
              {genreName}
            </NavLink>
          );
        })}
      </Box>
    </Container>
  );
}

export default Genres;
