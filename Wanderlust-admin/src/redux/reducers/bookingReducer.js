import {
  GET_BOOKING_FAILED,
  GET_BOOKING_SUCCESS,
  GET_BOOKING_REQUEST,
  UPDATE_BOOKING_REQUEST,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAILED,
  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAILED,
  GET_SINGLE_BOOKING_FAILED,
  GET_SINGLE_BOOKING_SUCCESS,
  GET_SINGLE_BOOKING_REQUEST,
  GET_NOTIFICATION_FAILED,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  GET_BOOKING_BY_STATUS_FAILED,
  GET_BOOKING_BY_STATUS_SUCCESS,
  GET_BOOKING_BY_STATUS_REQUEST,
  UPDATE_BOOKING_STATUS_FAILED,
  UPDATE_BOOKING_STATUS_REQUEST,
  UPDATE_BOOKING_STATUS_SUCCESS,
  ADD_BOOKING_NOTE_FAILED,
  ADD_BOOKING_NOTE_REQUEST,
  ADD_BOOKING_NOTE_SUCCESS,
  GET_BOOKING_NOTE_FAILED,
  GET_BOOKING_NOTE_REQUEST,
  GET_BOOKING_NOTE_SUCCESS,
  UPDATE_BOOKING_NOTE_FAILED,
  UPDATE_BOOKING_NOTE_REQUEST,
  UPDATE_BOOKING_NOTE_SUCCESS,
  DELETE_BOOKING_NOTE_FAILED,
  DELETE_BOOKING_NOTE_REQUEST,
  DELETE_BOOKING_NOTE_SUCCESS,
} from "../constants/bookingConstants";


const addBookingNoteStateInitial = {
  loading: false,
  data: null,
  error: null,
};
export const addBookingNoteReducer = (
  state = addBookingNoteStateInitial,
  action
) => {
  switch (action.type) {
    case ADD_BOOKING_NOTE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case ADD_BOOKING_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_BOOKING_NOTE_FAILED:
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

const deleteBookingNoteStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const deleteBookingNoteReducer = (
  state = deleteBookingNoteStateInitial,
  action
) => {
  switch (action.type) {
    case DELETE_BOOKING_NOTE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case DELETE_BOOKING_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case DELETE_BOOKING_NOTE_FAILED:
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

const getBookingNoteStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getBookingNoteReducer = (
  state = getBookingNoteStateInitial,
  action
) => {
  switch (action.type) {
    case GET_BOOKING_NOTE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_BOOKING_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_BOOKING_NOTE_FAILED:
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

const updateBookingNoteStateInitial = {
  loading: false,
  data: null,
  error: null,
};
export const updateBookingNoteReducer = (
  state = updateBookingNoteStateInitial,
  action
) => {
  switch (action.type) {
    case UPDATE_BOOKING_NOTE_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case UPDATE_BOOKING_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_BOOKING_NOTE_FAILED:
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

const updateBookingStatusStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const updateBookingStatusStateReducer = (
  state = updateBookingStatusStateInitial,
  action
) => {
  switch (action.type) {
    case UPDATE_BOOKING_STATUS_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case UPDATE_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_BOOKING_STATUS_FAILED:
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

const getBookingByStatusStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getBookingByStatusReducer = (
  state = getBookingByStatusStateInitial,
  action
) => {
  switch (action.type) {
    case GET_BOOKING_BY_STATUS_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_BOOKING_BY_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_BOOKING_BY_STATUS_FAILED:
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
const getNotificationStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getNotificationReducer = (
  state = getNotificationStateInitial,
  action
) => {
  switch (action.type) {
    case GET_NOTIFICATION_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_NOTIFICATION_FAILED:
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

const getSingleBookingStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getSingleBookingReducer = (
  state = getSingleBookingStateInitial,
  action
) => {
  switch (action.type) {
    case GET_SINGLE_BOOKING_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_SINGLE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_SINGLE_BOOKING_FAILED:
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

const updateBookingStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const updateBookingReducer = (
  state = updateBookingStateInitial,
  action
) => {
  switch (action.type) {
    case UPDATE_BOOKING_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case UPDATE_BOOKING_FAILED:
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

const getBookingStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const getBookingReducer = (state = getBookingStateInitial, action) => {
  switch (action.type) {
    case GET_BOOKING_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_BOOKING_FAILED:
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

const deleteBookingStateInitial = {
  loading: false,
  data: null,
  error: null,
};

export const deleteBookingReducer = (
  state = deleteBookingStateInitial,
  action
) => {
  switch (action.type) {
    case DELETE_BOOKING_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case DELETE_BOOKING_FAILED:
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
