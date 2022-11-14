import React from "react";

// MUI
import { Box, Skeleton } from "@mui/material";

function AnimeCardSkeleton() {
  return (
    <Box className="anime-card anime-card-skel center-vertical">
      <Box className="anime-card__image-box">
        <Skeleton variant="rectangular" className="anime-card__image" />
      </Box>

      <Skeleton variant="text" className="anime__title" />
      <Skeleton variant="text" className="anime__subText" />
    </Box>
  );
}

export default AnimeCardSkeleton;
