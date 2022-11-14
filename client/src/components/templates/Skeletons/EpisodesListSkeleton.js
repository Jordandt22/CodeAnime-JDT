import React from "react";

// MUI
import { Box, Skeleton } from "@mui/material";

function EpisodesListSkeleton() {
  return (
    <Box className="episodes">
      {[...Array(10)].map((_, i) => {
        return (
          <Skeleton
            key={`episode-skel-${i}`}
            variant="rectangular"
            className="episodes__ep episodes__ep-skeleton"
          />
        );
      })}
    </Box>
  );
}

export default EpisodesListSkeleton;
