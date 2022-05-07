import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function AnimeSectionError(props) {
  const { title, link, message } = props;

  return (
    <Box className="anime-section anime-section-skel">
      <Box className="anime-section__header">
        <NavLink to={link} className="header__title">
          {title}
        </NavLink>
      </Box>

      <ErrorMessage message={message} />
    </Box>
  );
}

export default AnimeSectionError;
