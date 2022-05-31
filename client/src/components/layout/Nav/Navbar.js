import React, { useEffect } from "react";

// React Router
import { NavLink, useLocation } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";

// Components
import SearchBar from "../../templates/SearchBar";
import MobileNavbar from "./MobileNavbar";

function NavBar() {
  // Resetting Scroll Position on Page Change
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Global
  const { isSmallDevice } = useGlobal();

  // Nav Links
  const links = [
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
    {
      label: "My Anime",
      path: "/myanime",
    },
  ];

  return (
    <>
      {isSmallDevice ? (
        <MobileNavbar />
      ) : (
        <header className="navbar between-row">
          <NavLink to="/" className="navbar__title">
            Code<span>Anime</span>
          </NavLink> 

          {/* Nav Links */}
          <Box className="navbar__links row">
            {links.map((link) => {
              const { label, path } = link;

              return (
                <NavLink
                  key={label + "-link"}
                  to={path}
                  className="navbar__link"
                >
                  {label}
                </NavLink>
              );
            })}

            <SearchBar
              className="navbar__search"
              placeholder="Search for anime..."
            />
          </Box>
        </header>
      )}
    </>
  );
}

export default NavBar;
