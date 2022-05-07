import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box, Skeleton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

function AnimeGenresSkeleton() {
  return (
    <Box className="anime-genres anime-genres-skeleton">
      <NavLink to="/genres" className="anime-genres__title">
        List of Genres
      </NavLink>

      <Box className="anime-genres__list-box center-vertical">
        <Box className="anime-genres__list between-row">
          {[...Array(18)].map((_, i) => {
            return (
              <Skeleton
                key={i + "-anime-genres-skeleton"}
                variant="rectangular"
                className="list__genre"
              />
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

export default AnimeGenresSkeleton;
