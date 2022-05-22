import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink, useNavigate } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";

// Components
import AnimeByGenreSkeleton from "../../templates/Skeletons/AnimeByGenreSkeleton";
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function AnimeByGenre(props) {
  const { title: genreTitle, link, genre } = props;
  const navigate = useNavigate();
  const { useGetAnimeByGenre } = useQueryHook();
  const { isLoading, isError, error, data } = useGetAnimeByGenre(1, genre);

  if (isLoading) {
    return <AnimeByGenreSkeleton genreTitle={genreTitle} link={link} />;
  } else if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  const { anime } = data.data.data;
  return (
    <Box className="genre-anime">
      <header className="genre-anime__header">
        <NavLink to={link} className="genre-title">
          {genreTitle}
        </NavLink>
      </header>

      {anime && anime.length > 0 ? (
        <Box className="genre-anime__list">
          {anime.slice(0, 5).map((ani) => {
            const { animeSlug, title: animeTitle, subText, image } = ani;
            const link = `/anime/${animeSlug}`;

            return (
              <Box
                key={animeSlug + "-genre-anime-" + genreTitle}
                className="list__anime row"
              >
                <LazyLoadImage
                  alt={animeTitle + "-background"}
                  src={image}
                  className="anime__image"
                  onClick={() => navigate(link)}
                />
                <Box className="anime__info">
                  <NavLink to={link} className="anime__title text-overflow">
                    {animeTitle}
                  </NavLink>
                  <p>{subText}</p>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <p className="none">There are no available anime for {genreTitle}</p>
      )}

      {/* View More */}
      <Box className="genre-anime__view-more center">
        <NavLink to={link} className="row">
          View More <ArrowForwardIos className="icon" />
        </NavLink>
      </Box>
    </Box>
  );
}

export default AnimeByGenre;
