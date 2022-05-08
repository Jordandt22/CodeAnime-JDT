import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// Contexts
import { useAnimeList } from "../../../context/AnimeList/AnimeList.context";

// Components
import AnimeCard from "../../templates/Anime/AnimeCard";

function AnimeList(props) {
  const { anime, noneText } = props;
  const totalPages = props.totalPages >= 5 ? 5 : props.totalPages;
  const { pathname } = useLocation();
  const { currentPage, setCurPage, prevPage, nextPage } = useAnimeList();
  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === totalPages - 1;

  // Resetting Scroll View When Page # Changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  // Resetting Current Page When Page Changes
  useEffect(() => {
    setCurPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Container className="container anime-list-container center-vertical">
      {anime.length > 0 ? (
        <Box className="anime-list-grid">
          {anime.map((ani) => {
            return (
              <AnimeCard
                key={ani.title + "-search-card"}
                sectionTitle="Search"
                {...ani}
              />
            );
          })}
        </Box>
      ) : (
        <p className="none">{noneText}</p>
      )}

      {anime.length > 0 && (
        <Box className="anime-list__nav row">
          <button
            type="button"
            className={`nav__btn ${
              isPrevDisabled ? "disabled" : "not-disabled"
            }`}
            disabled={isPrevDisabled}
            onClick={prevPage}
          >
            <ArrowBackIosNew className="icon" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            return (
              <button
                type="button"
                key={i + "-anime-list-btn"}
                className={`nav__page-btn center ${
                  currentPage === i ? "active" : "not-active"
                }`}
                onClick={() => setCurPage(i)}
              >
                <p>{i + 1}</p>
              </button>
            );
          })}

          <button
            type="button"
            className={`nav__btn ${
              isNextDisabled ? "disabled" : "not-disabled"
            }`}
            disabled={isNextDisabled}
            onClick={() => nextPage(totalPages)}
          >
            <ArrowForwardIos className="icon" />
          </button>
        </Box>
      )}
    </Container>
  );
}

export default AnimeList;
