import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";
import {
  PlayCircleFilledWhite,
  Info,
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context.js";
import { useAnimeSpotlight } from "../../../context/Spotlight/Spotlight.context.js";

function AnimeSpotlight() {
  const { currentAnime, prevAnime, nextAnime } = useAnimeSpotlight();
  const { useGetOngoingAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetOngoingAnime(1);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  const { anime } = data.data.data;
  const { animeSlug, epSlug, image, title, subText, latestEp } =
    anime[currentAnime];
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
            <h3>Spotlight #{currentAnime + 1}</h3>
            <NavLink
              to={`/anime/${animeSlug}`}
              className="anime__title text-overflow"
            >
              {title}
            </NavLink>
            <p className="anime__subText">{subText}</p>

            <Box className="row">
              <NavLink to={`/watch/${epSlug}`} className="watch__btn center">
                <PlayCircleFilledWhite className="icon" /> <p>Watch Now</p>
              </NavLink>
              <NavLink to={`/anime/${animeSlug}`} className="info__btn center">
                <Info className="icon" /> <p>More Info</p>
              </NavLink>
            </Box>
          </Box>
        </Box>

        {/* Spotlight Buttons */}
        <Box className="spotlight__buttons">
          <button
            type="button"
            className="spotlight__button"
            onClick={nextAnime}
          >
            <ArrowForwardIos className="icon" />
          </button>
          <button
            type="button"
            className="spotlight__button"
            onClick={prevAnime}
          >
            <ArrowBackIosNew className="icon" />
          </button>
        </Box>
      </main>
    </Container>
  );
}

export default AnimeSpotlight;
