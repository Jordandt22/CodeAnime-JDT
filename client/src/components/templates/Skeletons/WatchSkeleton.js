import React from "react";

// MUI
import { Container, Box, Skeleton } from "@mui/material";

function WatchSkeleton() {
  return (
    <Container className="container page-container watch-container watch-skeleton">
      <Skeleton variant="text" className="watch__title" />
      <Skeleton variant="text" className="watch__subTitle" />

      <Skeleton variant="rectangular" className="watch__video" />

      <Box className="row">
        <Skeleton variant="rectangular" className="watch__btn" />
        <Skeleton variant="rectangular" className="watch__btn" />
      </Box>
    </Container>
  );
}

export default WatchSkeleton;
