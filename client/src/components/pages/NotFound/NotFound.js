import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { Container, Box } from "@mui/material";

function NotFound() {
  return (
    <Container className="container page-container not-found-container center-vertical">
      <Box className="between-row not-found-404">
        <h1 className="left">4</h1>
        <h2>0</h2>
        <h1 className="right">4</h1>
      </Box>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <NavLink to="/">Back Home</NavLink>
    </Container>
  );
}

export default NotFound;
