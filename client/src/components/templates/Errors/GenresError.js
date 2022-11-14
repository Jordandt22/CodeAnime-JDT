import React from "react";

// MUI
import { Container } from "@mui/material";

// Components
import ErrorMessage from "../../layout/Errors/ErrorMessage";

function GenresError(props) {
  const { message } = props;

  return (
    <Container className="container page-container genres-container">
      <h2 className="genres__title">List of Genres</h2>

      <ErrorMessage message={message} />
    </Container>
  );
}

export default GenresError;
