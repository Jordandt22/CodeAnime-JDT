import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Box } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// Components
import AnimeCard from "./AnimeCard";

function AnimeSection(props) {
  const { title, link, anime } = props;
  const totalAnimePerTab = 7;
  const numOfTabs = anime ? Math.ceil(anime.length / totalAnimePerTab) : 0;
  const [currentTab, setCurTab] = useState(0);
  const startingNum = currentTab * totalAnimePerTab;
  const animeList = anime
    ? anime.slice(startingNum, startingNum + totalAnimePerTab)
    : [];
  const prevTab = () =>
    setCurTab((prevT) => (prevT <= 0 ? numOfTabs - 1 : prevT - 1));
  const nextTab = () =>
    setCurTab((prevT) => (prevT >= numOfTabs - 1 ? 0 : prevT + 1));

  return (
    <Box className="anime-section">
      {/* Header */}
      <Box className="anime-section__header">
        <NavLink to={link} className="header__title">
          {title}
        </NavLink>

        <Box className="header__tabs row">
          {[...Array(numOfTabs)].map((_, i) => {
            return (
              <Box
                key={i + "-header-tab"}
                className={`header__tab ${
                  currentTab === i ? "active" : "not-active"
                }`}
                onClick={() => setCurTab(i)}
              ></Box>
            );
          })}
        </Box>
      </Box>

      {/* Anime */}
      {animeList.length > 0 ? (
        <Box className="anime-section__anime">
          <button
            type="button"
            className="anime-section__button button__prev"
            onClick={prevTab}
          >
            <ArrowBackIosNew className="icon" />
          </button>

          {/* Anime List */}
          {animeList.map((anime) => {
            return (
              <AnimeCard
                key={anime.title + "-anime-section-" + title}
                {...anime}
                sectionTitle={title}
              />
            );
          })}

          <button
            type="button"
            className="anime-section__button button__next"
            onClick={nextTab}
          >
            <ArrowForwardIos className="icon" />
          </button>
        </Box>
      ) : (
        <p className="anime-section__none">
          There are no Recent Anime available currently.
        </p>
      )}
    </Box>
  );
}

export default AnimeSection;
