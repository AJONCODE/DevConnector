import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware = [thunk];
const initialState = {};

// Developer tools middleware
const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

/*
const store = createStore(
  () => [], // Root Reducer
  {}, // Initial State
  applyMiddleware()
);
*/
/*
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
*/

const store = createStore(
  rootReducer,
  initialState,
  composeSetup(applyMiddleware(...middleware))
);

export default store;
