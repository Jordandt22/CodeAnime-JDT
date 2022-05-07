import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import AnimeCardSkeleton from "./AnimeCardSkeleton";

function AnimeSectionSkeleton(props) {
  const { title, link } = props;

  return (
    <Box className="anime-section anime-section-skel">
      <Box className="anime-section__header">
        <NavLink to={link} className="header__title">
          {title}
        </NavLink>
      </Box>

      <Box className="anime-section__anime">
        {/* Anime List */}
        {[...Array(7)].map((_, i) => {
          return <AnimeCardSkeleton key={i + "-anime-card-skel"} />;
        })}
      </Box>
    </Box>
  );
}

export default AnimeSectionSkeleton;
