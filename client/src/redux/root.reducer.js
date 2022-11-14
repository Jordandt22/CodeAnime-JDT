import { combineReducers } from "redux";

// Reducers
import globalReducer from "./global/global.reducer";

// Root Reducer
const rootReducer = combineReducers({
  global: globalReducer,
});

export default rootReducer;
