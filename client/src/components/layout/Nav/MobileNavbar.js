import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import { LiveTv, Favorite, Home, Search } from "@mui/icons-material";

// Components
import NavSearchPopUp from "./NavSearchPopUp";

// Link
const MBNavLink = (props) => {
  const { path, icon, label, isSearch, onClick, otherActivePaths } = props;
  const { pathname } = useLocation();
  const formatedPathname = pathname.toLowerCase().trim();
  const isActive =
    formatedPathname === path ||
    (otherActivePaths && otherActivePaths[formatedPathname]);

  return (
    <>
      {isSearch ? (
        <div
          className={`mb-nav__link center-vertical ${
            isActive ? "active" : "not-active"
          }`}
          onClick={onClick}
        >
          {icon}
          <p>{label}</p>
        </div>
      ) : (
        <NavLink
          to={path}
          className={`mb-nav__link center-vertical ${
            isActive ? "active" : "not-active"
          }`}
        >
          {icon}
          <p>{label}</p>
        </NavLink>
      )}
    </>
  );
};

function MobileNavbar() {
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState("INITIAL");
  const links = [
    {
      path: "/",
      icon: <Home className="icon" />,
      label: "Home",
    },
    {
      path: "/recent",
      icon: <LiveTv className="icon" />,
      label: "browse",
      otherActivePaths: {
        "/popular": true,
        "/ongoing": true,
        "/new-season": true,
        "/genres": true,
      },
    },
    {
      path: null,
      icon: <Search className="icon" />,
      label: "Search",
      isSearch: true,
      onClick: () => setSearchOpen("OPEN"),
    },
    {
      path: "/myanime",
      icon: <Favorite className="icon" />,
      label: "My Anime",
    },
  ];

  useEffect(() => {
    if (searchOpen !== "INITIAL") setSearchOpen("CLOSED");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <Box className="mobile-navbar between-row">
        {links.map((link) => {
          return <MBNavLink key={link.label + "-nav-link"} {...link} />;
        })}
      </Box>

      {/* Search Open */}
      <NavSearchPopUp
        searchOpen={searchOpen}
        closePopUp={() => setSearchOpen("CLOSED")}
      />
    </>
  );
}

export default MobileNavbar;
