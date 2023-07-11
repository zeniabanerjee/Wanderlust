import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const initalState = {
  userLogin: {
    userDetails: JSON.parse(localStorage.getItem("userDetails")),
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
