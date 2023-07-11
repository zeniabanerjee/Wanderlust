import {
  ADD_PACKAGE_REQUEST,
  ADD_PACKAGE_SUCCESS,
  ADD_PACKAGE_FAILED,
  GET_PACKAGE_FAILED,
  GET_PACKAGE_SUCCESS,
  GET_PACKAGE_REQUEST,
  UPDATE_PACKAGE_REQUEST,
  UPDATE_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_FAILED,
  DELETE_PACKAGE_REQUEST,
  DELETE_PACKAGE_SUCCESS,
  DELETE_PACKAGE_FAILED,
  GET_SINGLE_PACKAGE_FAILED,
  GET_SINGLE_PACKAGE_SUCCESS,
  GET_SINGLE_PACKAGE_REQUEST,
} from "../constants/addPackageConstants";

const getSinglePackageStateInitial = {
  loading: false,
  data: null,
  error: null,
};
export const getSinglePackageReducer = (
  state = getSinglePackageStateInitial,
  action
) => {
  switch (action.type) {
    case GET_SINGLE_PACKAGE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_SINGLE_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_SINGLE_PACKAGE_FAILED:
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

const addPackageStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const addPackageReducer = (state = addPackageStateInitial, action) => {
  switch (action.type) {
    case ADD_PACKAGE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case ADD_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_PACKAGE_FAILED:
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

const updatePackageStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const updatePackageReducer = (
  state = updatePackageStateInitial,
  action
) => {
  switch (action.type) {
    case UPDATE_PACKAGE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case UPDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_PACKAGE_FAILED:
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

const getPackageStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getPackageReducer = (state = getPackageStateInitial, action) => {
  switch (action.type) {
    case GET_PACKAGE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_PACKAGE_FAILED:
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

const deletePackageStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const deletePackageReducer = (
  state = deletePackageStateInitial,
  action
) => {
  switch (action.type) {
    case DELETE_PACKAGE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case DELETE_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case DELETE_PACKAGE_FAILED:
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
