import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink, useNavigate } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import { Apps, PlayArrow } from "@mui/icons-material";

function AnimeCard(props) {
  const { sectionTitle, title, subText, image, epSlug, animeSlug } = props;
  const navigate = useNavigate();
  const link = epSlug ? `/watch/${epSlug}` : `/anime/${animeSlug}`;

  return (
    <Box className="anime-card center-vertical">
      <Box className="anime-card__image-box" onClick={() => navigate(link)}>
        <LazyLoadImage
          alt={title + "-anime-section-" + sectionTitle}
          src={image}
          className="anime-card__image"
        />
        <Box className="image__hover center">
          {epSlug ? <PlayArrow className="icon" /> : <Apps className="icon" />}
        </Box>
      </Box>

      <NavLink to={link} className="anime__title text-overflow">
        {title}
      </NavLink>
      <p>{subText}</p>
    </Box>
  );
}

export default AnimeCard;
