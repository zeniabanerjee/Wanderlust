import {
  ADD_TRIP_FAILED,
  ADD_TRIP_REQUEST,
  ADD_TRIP_SUCCESS,
  UPDATE_TRIP_FAILED,
  UPDATE_TRIP_REQUEST,
  UPDATE_TRIP_SUCCESS,
  DELETE_TRIP_FAILED,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_REQUEST,
  GET_TRIP_REQUEST,
  GET_TRIP_FAILED,
  GET_TRIP_SUCCESS,
  GET_ALL_TYPE_FAILED,
  GET_ALL_TYPE_SUCCESS,
  GET_ALL_TYPE_REQUEST,
} from "../constants/addTripConstant";

const getAllTypeStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getAllTypeReducer = (state = getAllTypeStateInitial, action) => {
  switch (action.type) {
    case GET_ALL_TYPE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_ALL_TYPE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_TYPE_FAILED:
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

const addNewTripStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const addNewTipReducer = (state = addNewTripStateInitial, action) => {
  switch (action.type) {
    case ADD_TRIP_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case ADD_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_TRIP_FAILED:
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

const getTripStateInitital = {
  loading: false,
  data: null,
  error: null,
};

export const getTripReducer = (state = getTripStateInitital, action) => {
  switch (action.type) {
    case GET_TRIP_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case GET_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_TRIP_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const deleteTripInitital = {
  loading: false,
  data: null,
  error: null,
};

export const deleteTripReducer = (state = deleteTripInitital, action) => {
  switch (action.type) {
    case DELETE_TRIP_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case DELETE_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_TRIP_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const updateTripInitial = {
  loading: false,
  data: null,
  error: null,
};

export const updateTripReducer = (state = updateTripInitial, action) => {
  switch (action.type) {
    case UPDATE_TRIP_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case UPDATE_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_TRIP_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};
