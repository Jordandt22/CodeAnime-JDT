import React, { useState } from "react";

// MUI
import { Container, Box } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

// Components
import EpisodesQuery from "./EpisodesQuery";

function AnimeEpisodes(props) {
  const {
    animeSlug,
    data: {
      episodes: { epSections, epsParams },
    },
  } = props;
  const [currentSection, setCurSection] = useState(0);
  const epSection = epSections[currentSection];

  return (
    <>
      <Container className="container anime-eps-container">
        <h1>Episodes</h1>

        {/* Episode Section Tabs */}
        {epSections && epSections.length > 0 && (
          <Box className="anime-eps__tabs">
            {epSections.map((section, i) => {
              const { ep_start, ep_end } = section;

              return (
                <button
                  key={ep_start + "-" + ep_end}
                  type="button"
                  className={`tabs__tab ${
                    i === currentSection ? "active" : "not-active"
                  }`}
                  onClick={() => setCurSection(i)}
                >
                  {ep_start} - {ep_end}
                </button>
              );
            })}
          </Box>
        )}

        {/* Episodes */}
        <EpisodesQuery
          animeSlug={animeSlug}
          epSection={epSection}
          epsParams={epsParams}
        />
      </Container>

      {/* Back To Top */}
      <button
        type="button"
        className="btt-btn center"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ArrowUpward className="icon" />
      </button>
    </>
  );
}

export default AnimeEpisodes;
