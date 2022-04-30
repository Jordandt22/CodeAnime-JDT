import { SET_ERROR, RESET_ERROR } from "./global.types";

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetError = () => ({
  type: RESET_ERROR,
});
