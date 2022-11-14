import React from "react";

// MUI
import { Container, Box, Skeleton } from "@mui/material";

function GenresSkeleton() {
  return (
    <Container className="container page-container genres-container">
      <h2 className="genres__title">List of Genres</h2>

      <Box className="genres__list">
        {[...Array(40)].map((_, i) => {
          return (
            <Skeleton
              key={i + "-genre-link-skel"}
              variant="rectangular"
              className="list__genre"
            />
          );
        })}
      </Box>
    </Container>
  );
}

export default GenresSkeleton;
