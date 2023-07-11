import axios from "axios";

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

const API = process.env.REACT_APP_NODE_API;

export const getSinglePackage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_PACKAGE_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(
      `${API}/get-trip-details/trip-package/${id}`,
      header
    );

    dispatch({
      type: GET_SINGLE_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PACKAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getPackage = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PACKAGE_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.get(`${API}/get-module/trip-package`, header);
    dispatch({
      type: GET_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const addPackage = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_PACKAGE_REQUEST,
    });

    const body = formdata;
    const header = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.post(
      `${API}/create-module/trip-package`,
      body,
      header
    );


    dispatch({
      type: ADD_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PACKAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const updatePackage = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PACKAGE_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };

    const body = formData;

    const { data } = await axios.post(
      `${API}/update-module/trip-package/${id}`,
      body,
      header
    );

    dispatch({
      type: UPDATE_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PACKAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const deletePackage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PACKAGE_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(
      `${API}/delete-module/trip-package/${id}`,
      header
    );
    dispatch({
      type: DELETE_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PACKAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};
