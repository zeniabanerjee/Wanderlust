import { ADMIN_REQUEST, ADMIN_SUCCESS, ADMIN_FAILED } from "../constants/loginAdminConstants";

const initialState = {
  userDetails: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        userDetails: null,
        error: null,
      };
    case ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.payload,
        error: null,
      };
    case ADMIN_FAILED:
      return {
        ...state,
        loading: false,
        userDetails: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
