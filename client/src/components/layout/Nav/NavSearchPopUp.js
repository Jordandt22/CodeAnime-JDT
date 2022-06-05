import React, { useEffect } from "react";

// MUI
import { Box } from "@mui/material";

// Components
import SearchBar from "../../templates/SearchBar";

function NavSearchPopUp(props) {
  const { searchOpen, closePopUp } = props;

  return (
    <Box
      className={`mb-nav__search center-vertical ${
        searchOpen === "OPEN"
          ? "mb-nav__show-search"
          : searchOpen === "CLOSED"
          ? "mb-nav__hide-search"
          : "hide"
      }`}
    >
      <SearchBar
        className="mb-nav__search-bar"
        placeholder="Search for Anime"
      />
      <button
        type="button"
        className="mb-nav__close-search"
        onClick={closePopUp}
      >
        Close
      </button>
    </Box>
  );
}

export default NavSearchPopUp;
