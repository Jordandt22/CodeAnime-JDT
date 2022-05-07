import React from "react";

// MUI
import { Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

function ErrorMessage(props) {
  const { message } = props;

  return (
    <Box className="error-message">
      <Box className="error__icon center">
        <ErrorOutline className="icon" /> Error
      </Box>
      <p>{message}</p>
    </Box>
  );
}

export default ErrorMessage;
