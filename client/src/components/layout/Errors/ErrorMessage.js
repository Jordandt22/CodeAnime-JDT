import React from "react";

// MUI
import { Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

// Contexts
import { useQueryHook } from "../../../context/Query/Query.context";

function ErrorMessage(props) {
  const { message } = props;
  const { queryError } = useQueryHook();

  return (
    <Box className="error-message">
      <Box className="error__icon center">
        <ErrorOutline className="icon" /> Error {queryError.status}
      </Box>
      <p>
        {queryError.message
          ? queryError.message
          : message
          ? message
          : "Sorry, a problem occured."}
      </p>
    </Box>
  );
}

export default ErrorMessage;
