import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Check } from "@mui/icons-material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";
import { useWatch } from "../../../context/WatchList/WatchList.context";

// Components
import ErrorMessage from "../../../components/layout/Errors/ErrorMessage";
import WatchSkeleton from "../../templates/Skeletons/WatchSkeleton";

function Watch() {
  const { animeSlug, epSlug } = useParams();
  const { checkWatchList, toggleEpFromWatchList } = useWatch();
  const { useGetAnimeVideo } = useQueryHook();
  const { isLoading, isError, error, data } = useGetAnimeVideo(epSlug);
  const [currentSource, setCurSource] = useState(0);
  const [addAnimeBtnActive, setBtnActive] = useState(
    checkWatchList(animeSlug, epSlug).active
  );

  // Resetting Current Source
  useEffect(() => {
    setCurSource(0);
    setBtnActive(checkWatchList(animeSlug, epSlug).active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeSlug, epSlug]);

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
    animeSlug: dataAnimeSlug,
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
      <NavLink to={`/anime/${dataAnimeSlug}`} className="watch__title">
        {title}
      </NavLink>
      <h3>Episode {dataEpSlug.split("-episode-")[1]}</h3>

      {/* Video Section */}
      <Box className="row video-row">
        <Box className="video-box">
          {/* Video */}
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

          {/* Video Btns */}
          <Box className="video-btns between-row">
            <Box className="row">
              <NavLink
                to={
                  prev
                    ? `/watch/${dataAnimeSlug}/${prev}`
                    : `/watch/${dataAnimeSlug}/${dataEpSlug}`
                }
                className={`watch__video-nav center ${
                  !prev ? "watch__disabled" : "not-disabled"
                }`}
              >
                <ArrowBackIosNew className="icon" />
              </NavLink>
              <NavLink
                to={
                  next
                    ? `/watch/${dataAnimeSlug}/${next}`
                    : `/watch/${dataAnimeSlug}/${dataEpSlug}`
                }
                className={`watch__video-nav center ${
                  !next ? "watch__disabled" : "not-disabled"
                }`}
              >
                <ArrowForwardIos className="icon" />
              </NavLink>
            </Box>

            {/* Add Btn */}
            <button
              type="button"
              className={`add-anime-btn center ${
                addAnimeBtnActive ? "add-active" : "not-active"
              }`}
              onClick={() =>
                toggleEpFromWatchList(
                  dataAnimeSlug,
                  { epSlug: dataEpSlug, prev, next },
                  title,
                  setBtnActive
                )
              }
            >
              <Check className="icon" />
            </button>
          </Box>
        </Box>

        {/* Video Sources */}
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
    </Container>
  );
}

export default Watch;
