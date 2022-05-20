import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import {
  PlayCircleFilledWhite,
  Info,
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context.js";
import { useAnimeSpotlight } from "../../../context/Spotlight/Spotlight.context.js";

// Components
import AnimeSpotlightSkeleton from "../../templates/Skeletons/AnimeSpotlightSkeleton";
import AnimeSpotlightError from "../../templates/Errors/AnimeSpotlightError.js";
import AnimeInfoDisplay from "../../templates/Anime/AnimeInfoDisplay";

function AnimeSpotlight() {
  const { currentAnime, prevAnime, nextAnime } = useAnimeSpotlight();
  const { useGetOngoingAnime } = useQueryHook();
  const { isLoading, isError, error, data } = useGetOngoingAnime(1);

  if (isLoading) {
    return <AnimeSpotlightSkeleton />;
  } else if (isError) {
    return <AnimeSpotlightError message={error.message} />;
  }

  const { anime } = data.data.data;
  const { animeSlug, epSlug, image, title, subText, latestEp } =
    anime[currentAnime];
  return (
    <AnimeInfoDisplay
      title={title}
      image={image}
      latestEp={latestEp}
      secTitle={`Spotlight #${currentAnime + 1}`}
      animeSlug={animeSlug}
      subText={subText}
      displayButtons={
        <>
          <NavLink to={`/watch/${epSlug}`} className="watch__btn center">
            <PlayCircleFilledWhite className="icon" /> <p>Watch Now</p>
          </NavLink>
          <NavLink to={`/anime/${animeSlug}`} className="info__btn center">
            <Info className="icon" /> <p>More Info</p>
          </NavLink>
        </>
      }
      navButtons={
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
      }
    />
  );
}

export default AnimeSpotlight;
