import React from "react";
import { connect } from "react-redux";

// React Router
import { useNavigate } from "react-router-dom";

// Formik
import { Formik, Form, Field } from "formik";

// MUI
import { Box } from "@mui/material";
import { Search } from "@mui/icons-material";

// Redux
import { setError } from "../../redux/global/global.actions";

function SearchBar(props) {
  const { className, placeholder } = props;
  const navigate = useNavigate();
  const setError = (message) =>
    props.setError({ title: "Search Error", message });

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);

        const { query } = values;
        const queryLength = query.length;
        if (queryLength <= 0) {
          setError("Must enter a value to search.");
        } else if (queryLength > 100) {
          setSubmitting(false);
          setError("Your search value is too long.");
        } else {
          setSubmitting(false);
          resetForm();
          navigate(`/search/${query}`);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form aria-disabled={isSubmitting}>
          <Field name="query">
            {({ field }) => (
              <Box
                className={
                  `${
                    isSubmitting ? "form-disabled" : "form-not-disabled"
                  } row ` + className
                }
              >
                <input
                  disabled={isSubmitting}
                  style={{ cursor: isSubmitting ? "not-allowed" : "text" }}
                  type="text"
                  placeholder={placeholder}
                  autoComplete="off"
                  {...field}
                />
                <label htmlFor="query">
                  <Search className="icon" />
                </label>
              </Box>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}

// Redux
const ReduxActions = (dispatch) => ({
  setError: (error) => dispatch(setError(error)),
});

export default connect(null, ReduxActions)(SearchBar);
