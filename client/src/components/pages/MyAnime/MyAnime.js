import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

// Contexts
import { useWatch } from "../../../context/WatchList/WatchList.context";

function MyAnime() {
  const navigate = useNavigate();
  const { getWatchList, removeAnimeFromWatchList } = useWatch();
  const [watchListData, setWatchListData] = useState(getWatchList());
  const watchList = Object.values(watchListData);

  return (
    <Container className="page-container container myanime-container">
      <h1>My Anime</h1>

      {/* Watch List */}
      {watchList.length > 0 ? (
        <Box className="watch-list">
          {watchList.map((anime) => {
            const { animeSlug, title, eps } = anime;
            const { epSlug, epNum, next } = eps.sort(
              (a, b) => b.epNum - a.epNum
            )[0];
            const lastEp = !next;
            const epNumDisplay = lastEp ? epNum : epNum + 1;
            const curSlug = lastEp ? epSlug : next;

            return (
              <Box key={animeSlug} className="watch-list__anime row">
                <Box
                  className={`anime__info ${
                    lastEp ? "last-episode" : "not-last-episode"
                  }`}
                  onClick={() => navigate(`/watch/${animeSlug}/${curSlug}`)}
                >
                  <h3 className="text-overflow">{title}</h3>
                  <p>Episode {epNumDisplay}</p>
                </Box>

                <Box className="anime__remove-box center">
                  <button
                    type="button"
                    className="anime__remove center"
                    onClick={() =>
                      removeAnimeFromWatchList(animeSlug, setWatchListData)
                    }
                  >
                    <Close className="icon" />
                  </button>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <p className="none">You have no Anime in your Watch List.</p>
      )}
    </Container>
  );
}

export default MyAnime;
