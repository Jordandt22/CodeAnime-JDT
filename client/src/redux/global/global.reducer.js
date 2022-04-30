import { SET_ERROR, RESET_ERROR } from "./global.types";

const GlobalState = {
  error: {
    open: false,
    title: "Error",
    message: "Sorry, a problem occured.",
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = GlobalState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: { open: true, ...action.payload } };

    case RESET_ERROR:
      return { ...state, error: GlobalState.error };

    default:
      return state;
  }
};
