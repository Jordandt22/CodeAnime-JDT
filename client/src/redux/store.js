import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root.reducer";

// Enhancer
const devEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const prodEnhancers = compose(applyMiddleware(thunk));

// Redux Store
const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development" ? devEnhancers : prodEnhancers
);

export default store;
