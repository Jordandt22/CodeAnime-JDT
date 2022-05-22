import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";

// Components
import ErrorMessage from "../../../components/layout/Errors/ErrorMessage";
import WatchSkeleton from "../../templates/Skeletons/WatchSkeleton";

function Watch() {
  const { epSlug } = useParams();
  const { useGetAnimeVideo } = useQueryHook();
  const { isLoading, isError, error, data } = useGetAnimeVideo(epSlug);
  const [currentSource, setCurSource] = useState(0);

  // Resetting Current Source
  useEffect(() => {
    setCurSource(0);
  }, [epSlug]);

  if (isLoading) {
    return <WatchSkeleton />;
  } else if (isError) {
    return (
      <Container className="container page-container">
        <ErrorMessage message={error.message} />;
      </Container>
    );
  }

  const {
    animeSlug,
    epSlug: dataEpSlug,
    title,
    video: { type, src, prev, next },
    videoSources,
  } = data.data.data;
  const vidSrc = videoSources[currentSource]
    ? videoSources[currentSource].src
    : src;
  return (
    <Container className="container page-container watch-container">
      <NavLink to={`/anime/${animeSlug}`} className="watch__title">
        {title}
      </NavLink>
      <h3>Episode {dataEpSlug.split("-episode-")[1]}</h3>

      {/* Video */}
      <Box className="row video-row">
        {type === "IFRAME" ? (
          <iframe
            className="watch__video"
            allowFullScreen={true}
            scrolling="no"
            title={title + " - Code Anime 3"}
            src={vidSrc}
          />
        ) : (
          <p className="video-error">
            Sorry, the video is currently unavailable.
          </p>
        )}

        <Box className="watch__video-sources">
          {videoSources.map((s, i) => {
            const { name } = s;

            return (
              <p
                key={name}
                className={`${currentSource === i ? "active" : "not-active"}`}
                onClick={() => setCurSource(i)}
              >
                {name}
              </p>
            );
          })}
        </Box>
      </Box>

      <Box className="between-row">
        <Box className="row">
          <NavLink
            to={prev ? `/watch/${prev}` : `/watch/${dataEpSlug}`}
            className={`watch__video-nav center ${
              !prev ? "watch__disabled" : "not-disabled"
            }`}
          >
            <ArrowBackIosNew className="icon" />
          </NavLink>
          <NavLink
            to={next ? `/watch/${next}` : `/watch/${dataEpSlug}`}
            className={`watch__video-nav center ${
              !next ? "watch__disabled" : "not-disabled"
            }`}
          >
            <ArrowForwardIos className="icon" />
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
}

export default Watch;
