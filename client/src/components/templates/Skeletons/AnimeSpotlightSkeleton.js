import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// MUI
import { Container, Box, Skeleton } from "@mui/material";

function AnimeSpotlightSkeleton(props) {
  const { secHeaderText, showGenres } = props;

  return (
    <Container className="container anime-spotlight anime-spotlight-skeleton">
      <LazyLoadImage
        alt="anime-background"
        src={process.env.PUBLIC_URL + "/assets/images/anime-background.webp"}
        className="spotlight__background"
      />
      <div className="spotlight__shadow"></div>
      <main className="spotlight__main">
        <Box className="spotlight__anime">
          <Box className="anime__image-box">
            <Skeleton variant="rectangular" className="anime__image" />
          </Box>

          {/* Anime Info */}
          <Box className="anime__info">
            <h3>{secHeaderText ? secHeaderText : "Spotlight #1"}</h3>
            <Skeleton variant="text" className="anime__title" />
            <Box className="skeleton__subTexts">
              <Skeleton variant="text" className="anime__subText subText__1" />
              <Skeleton variant="text" className="anime__subText subText__2" />
              <Skeleton variant="text" className="anime__subText subText__3" />
              <Skeleton variant="text" className="anime__subText subText__4" />
            </Box>

            <Box className="row">
              {!showGenres ? (
                <>
                  <Skeleton variant="rectangular" className="watch__btn" />
                  <Skeleton variant="rectangular" className="info__btn" />
                </>
              ) : (
                <>
                  <Skeleton variant="rectangular" className="info__btn" />
                  <Skeleton variant="rectangular" className="info__btn" />
                  <Skeleton variant="rectangular" className="info__btn" />
                  <Skeleton variant="rectangular" className="info__btn" />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </main>
    </Container>
  );
}

export default AnimeSpotlightSkeleton;
