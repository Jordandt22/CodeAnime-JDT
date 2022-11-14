import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// MUI
import { Container, Box } from "@mui/material";

// Components
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function AnimeSpotlightError(props) {
  const { message } = props;

  return (
    <Container className="container anime-spotlight anime-spotlight-skeleton">
      <LazyLoadImage
        alt="anime-background"
        src={process.env.PUBLIC_URL + "/assets/images/anime-background.webp"}
        className="spotlight__background"
      />
      <div className="spotlight__shadow"></div>
      <main className="spotlight__main">
        <Box style={{ width: "100%" }} className="center">
          <ErrorMessage message={message} />
        </Box>
      </main>
    </Container>
  );
}

export default AnimeSpotlightError;
