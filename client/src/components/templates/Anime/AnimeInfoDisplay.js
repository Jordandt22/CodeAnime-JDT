import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";

function AnimeInfoDisplay(props) {
  const {
    title,
    image,
    latestEp,
    secTitle,
    animeSlug,
    subText,
    displayButtons,
    navButtons,
  } = props;

  return (
    <Container className="container anime-spotlight">
      <LazyLoadImage
        alt={title + "-background"}
        src={image}
        className="spotlight__background"
      />
      <div className="spotlight__shadow"></div>
      <main className="spotlight__main">
        <Box className="spotlight__anime">
          {/* Image */}
          <Box className="anime__image-box">
            <LazyLoadImage alt={title} src={image} className="anime__image" />
            <Box className="anime__latestEp">
              <p>{latestEp}</p>
            </Box>
          </Box>
          {/* Anime Info */}
          <Box className="anime__info">
            <h3>{secTitle}</h3>
            <NavLink
              to={`/anime/${animeSlug}`}
              className="anime__title text-overflow"
            >
              {title}
            </NavLink>
            <p className="anime__subText">{subText}</p>

            <Box className="row display-buttons">{displayButtons}</Box>
          </Box>
        </Box>

        {/* Spotlight Buttons */}
        {navButtons && navButtons}
      </main>
    </Container>
  );
}

export default AnimeInfoDisplay;
