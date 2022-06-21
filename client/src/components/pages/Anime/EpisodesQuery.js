import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";

// Components
import EpisodesListSkeleton from "../../templates/Skeletons/EpisodesListSkeleton";
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function EpisodesQuery(props) {
  const { animeSlug, epSection, epsParams } = props;
  const navigate = useNavigate();
  const { useGetAnimeEpisodes } = useQueryHook();
  const { isLoading, isError, error, data } = useGetAnimeEpisodes(
    epsParams,
    epSection
  );

  if (isLoading) {
    return <EpisodesListSkeleton />;
  } else if (isError) {
    return (
      <Box className="episodes">
        <ErrorMessage message={error.message} />
      </Box>
    );
  }

  const { episodes } = data?.data?.data;
  return (
    <Box className="episodes">
      {episodes && episodes.length > 0 ? (
        <>
          {episodes.map((ep) => {
            const { num, lang, slug } = ep;
            return (
              <Box
                key={slug}
                className="episodes__ep between-row"
                onClick={() => navigate(`/watch/${animeSlug}/${slug}`)}
              >
                <p>Episode {num}</p>
                <p>{lang}</p>
              </Box>
            );
          })}
        </>
      ) : (
        <p className="none">There are no available episodes for this Anime.</p>
      )}
    </Box>
  );
}

export default EpisodesQuery;
