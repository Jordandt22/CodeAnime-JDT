import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

function AnimeLinks() {
  const { pathname } = useLocation();
  const animeLinks = [
    {
      label: "Recent",
      path: "/recent",
    },
    {
      label: "Popular",
      path: "/popular",
    },
    {
      label: "Ongoing",
      path: "/ongoing",
    },
    {
      label: "New Season",
      path: "/new-season",
    },
    {
      label: "Genres",
      path: "/genres",
    },
  ];

  return (
    <Box className="anime-links row">
      {animeLinks.map((link) => {
        const { label, path } = link;
        const isCurrentLink = pathname.toLowerCase() === path;

        return (
          <NavLink
            key={label + "-anime-link"}
            to={path}
            className={`anime-link ${isCurrentLink ? "active" : "not-active"}`}
          >
            {label}
          </NavLink>
        );
      })}
    </Box>
  );
}

export default AnimeLinks;
