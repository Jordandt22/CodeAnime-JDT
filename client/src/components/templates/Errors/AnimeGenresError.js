import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function AnimeGenresError(props) {
  const { message } = props;

  return (
    <Box className="anime-genres anime-genres-skeleton">
      <NavLink to="/genres" className="anime-genres__title">
        List of Genres
      </NavLink>

      <ErrorMessage message={message} />
    </Box>
  );
}

export default AnimeGenresError;
