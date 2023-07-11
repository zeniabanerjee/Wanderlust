import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from "../constants/userConstantTest.js";

const signInStateInitial = {
  loading: false,
  userDetails: null,
  error: null,
};

export const logInUserReducer = (state = signInStateInitial, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        userDetails: null,
        loading: true,
        error: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: true,
        error: null,
        userDetails: action.payload,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        userDetails: null,
        loading: true,
        error: action.payload,
      };
    default: {
      return false;
    }
  }
};
