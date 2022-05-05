import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";

function AnimeGenres() {
  const { useGetAnimeGenres } = useQueryHook();
  const { isLoading, isError, error, data } = useGetAnimeGenres();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  const { genres } = data.data.data;
  return (
    <Box className="anime-genres">
      <NavLink to="/genres" className="anime-genres__title">
        List of Genres
      </NavLink>

      <Box className="anime-genres__list-box center-vertical">
        <Box className="anime-genres__list between-row">
          {genres.slice(0, 18).map((genre) => {
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

        <NavLink to="/genres" className="list__view-all row">
          View All <ArrowForwardIos className="icon" />
        </NavLink>
      </Box>
    </Box>
  );
}

export default AnimeGenres;
