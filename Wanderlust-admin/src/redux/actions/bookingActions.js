import axios from "axios";


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
  GET_BOOKING_BY_STATUS_REQUEST,
  GET_BOOKING_BY_STATUS_SUCCESS,
  UPDATE_BOOKING_STATUS_REQUEST,
  UPDATE_BOOKING_STATUS_FAILED,
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

const API = process.env.REACT_APP_NODE_API;

export const updateBookingNote = (id, note) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BOOKING_NOTE_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };

    const body = {
      note,
    };
    const { data } = await axios.post(
      `${API}/update-booking-note/${id}`,
      body,
      header
    );

    dispatch({
      type: UPDATE_BOOKING_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BOOKING_NOTE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const deleteBookingNote = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BOOKING_NOTE_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.delete(
      `${API}/delete-booking-note/${id}`,
      header
    );

    dispatch({
      type: DELETE_BOOKING_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING_NOTE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getBookingNote = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOKING_NOTE_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.get(`${API}/get-booking-note`, header);

    dispatch({
      type: GET_BOOKING_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKING_NOTE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const addBookingNote = (note) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_BOOKING_NOTE_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };

    const body = {
      note,
    };

    const { data } = await axios.post(`${API}/add-booking-note`, body, header);

    dispatch({
      type: ADD_BOOKING_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_BOOKING_NOTE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const updateBookingStatus = (id, bookingStatus) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BOOKING_STATUS_REQUEST,
    });

    const body = {
      bookingStatus,
    };

    const header = { "Content-Type": "application/json" };

    const { data } = await axios.post(
      `${API}/update-booking-status/${id}`,
      body,
      header
    );

    dispatch({
      type: UPDATE_BOOKING_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BOOKING_STATUS_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getBookingByStatus = (status) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOKING_BY_STATUS_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/get-booking/${status}`, header);

    dispatch({
      type: GET_BOOKING_BY_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKING_BY_STATUS_FAILED,
      payload: error.message,
    });
  }
};

export const getNotification = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_NOTIFICATION_REQUEST,
    });

    const header = {
      "Content-type": "application/json",
    };

    const { data } = await axios.get(
      `${API}/get-cancel-booking-request`,
      header
    );

    dispatch({
      type: GET_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATION_FAILED,
      error: error.message,
    });
  }
};

export const getSingleBooking = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_BOOKING_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/booking-details/${id}`, header);

    dispatch({
      type: GET_SINGLE_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_BOOKING_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const deleteBooking = (id, userType) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_BOOKING_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${API}/delete-booking/${userType}/${id}`,
      header
    );

    dispatch({
      type: DELETE_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getBooking = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOKING_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/all-booking`, header);

    dispatch({
      type: GET_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKING_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const updateBooking = (id, status, reason, read) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BOOKING_REQUEST,
    });
    const body = {
      cancellationStatus: status,
      deleteReason: reason,
      read: read,
    };
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${API}/update-booking/${id}`,
      body,
      header
    );

    dispatch({
      type: UPDATE_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BOOKING_FAILED,
      payload: error.response.data.message,
    });
  }
};
