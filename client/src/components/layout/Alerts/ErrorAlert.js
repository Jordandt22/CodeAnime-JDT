import React, { useEffect } from "react";
import { connect } from "react-redux";

// MUI
import { Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

// Redux
import { resetError } from "../../../redux/global/global.actions";

function ErrorAlert(props) {
  const {
    global: {
      error: { open, message, title },
    },
    resetError,
  } = props;

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        resetError();
      }, 5000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      {open && (
        <Box className="alert__error between-row">
          <Box>
            <h4>{title}</h4>
            <p>{message}</p>
          </Box>
          <ErrorOutline className="icon" />
        </Box>
      )}
    </>
  );
}

// Redux
const ReduxState = (state) => ({
  global: state.global,
});

const ReduxActions = (dispatch) => ({
  resetError: () => dispatch(resetError()),
});

export default connect(ReduxState, ReduxActions)(ErrorAlert);
