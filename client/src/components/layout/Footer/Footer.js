import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

function Footer() {
  const linkSection = [
    {
      label: "Information",
      links: [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
      ],
    },
    {
      label: "Explore",
      links: [
        { label: "Genres", path: "/genres" },
        { label: "New Season Anime", path: "/new-season" },
      ],
    },
    {
      label: "Anime",
      links: [
        { label: "Recent Anime", path: "/recent" },
        { label: "Popular Anime", path: "/popular" },
        { label: "Ongoing Anime", path: "/ongoing" },
      ],
    },
    {
      label: "Contact",
      text: "CodeAnimeStaff@gmail.com",
    },
  ];

  return (
    <footer className="footer row">
      <Box className="footer__about">
        <Box className="about__info">
          <h2>
            Code<span>Anime</span>
          </h2>
          <p>
            A place for you to watch all your favorite anime, ad free, anytime,
            anywhere.
          </p>
        </Box>
        <Box className="row">
          <p className="about__copyright">© 2022 CodeAnime.</p>
          <p className="about__copyright">All Rights Reserved.</p>
        </Box>
      </Box>

      {/* Footer Links */}
      <Box className="footer__links row">
        {linkSection.map((section) => {
          const { label: sectionLabel, links, text } = section;

          return (
            <Box key={sectionLabel + "-footer"} className="links__section">
              <h6>{sectionLabel}</h6>

              {!text ? (
                links.map((link) => {
                  const { label: linkLabel, path } = link;

                  return (
                    <NavLink
                      key={linkLabel}
                      to={path}
                      className="section__link"
                    >
                      {linkLabel}
                    </NavLink>
                  );
                })
              ) : (
                <p className="section__link">{text}</p>
              )}
            </Box>
          );
        })}
      </Box>
    </footer>
  );
}

export default Footer;
