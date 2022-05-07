import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box, Skeleton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

function AnimeByGenreSkeleton(props) {
  const { genreTitle, link } = props;

  return (
    <Box className="genre-anime genre-anime-skeleton">
      <header className="genre-anime__header">
        <NavLink to={link} className="genre-title">
          {genreTitle}
        </NavLink>
      </header>

      {/* Anime Skeleton List */}
      <Box className="genre-anime__list">
        {[...Array(5)].map((_, i) => {
          return (
            <Box key={i + "-genre-anime-skeleton"} className="list__anime row">
              <Skeleton variant="rectangular" className="anime__image" />

              <Box className="anime__info">
                <Skeleton variant="text" className="anime__title" />
                <Skeleton variant="text" className="anime__subText" />
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* View More */}
      <Box className="genre-anime__view-more center">
        <NavLink to={link} className="row">
          View More <ArrowForwardIos className="icon" />
        </NavLink>
      </Box>
    </Box>
  );
}

export default AnimeByGenreSkeleton;
