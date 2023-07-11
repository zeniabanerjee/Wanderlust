import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../constants/addUserConstant.js";

const addNewUserStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const addNewUserReducer = (state = addNewUserStateInitial, action) => {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_USER_FAILED:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const getUserStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getUserReducer = (state = getUserStateInitial, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const updateUserStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const updateUserReducer = (state = updateUserStateInitial, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const delUserStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const delUserReducer = (state = delUserStateInitial, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};
