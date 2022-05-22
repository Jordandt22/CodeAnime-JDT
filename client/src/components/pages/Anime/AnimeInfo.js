import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import AnimeInfoDisplay from "../../templates/Anime/AnimeInfoDisplay";

function AnimeInfo(props) {
  const {
    data: {
      slug,
      title,
      image,
      type,
      released,
      status,
      summary,
      episodes: { totalEps },
      genres,
    },
  } = props;

  return (
    <AnimeInfoDisplay
      title={title}
      image={image}
      latestEp={`Episode ${totalEps}`}
      secTitle={
        <Box className="row anime-info__secTitle">
          {[type, released, status, `${totalEps} Episodes`].map((str, i) => {
            return (
              <p key={str} className={i !== 3 ? "dot" : "no-dot"}>
                {str}
              </p>
            );
          })}
        </Box>
      }
      animeSlug={slug}
      subText={summary}
      displayButtons={
        <>
          {genres.slice(0, 5).map((g) => {
            const { genreSlug, genre } = g;

            return (
              <NavLink
                key={genre}
                to={`/genre/${genreSlug}`}
                className="anime-info__genre"
              >
                {genre}
              </NavLink>
            );
          })}
        </>
      }
      navButtons={null}
    />
  );
}

export default AnimeInfo;
