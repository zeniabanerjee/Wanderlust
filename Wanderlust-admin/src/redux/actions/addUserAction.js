import axios from "axios";
import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "../constants/addUserConstant.js";

const API = process.env.REACT_APP_NODE_API;

export const addNewUser = (name, email, type, port) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_USER_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const body = {
      name,
      email,
      port,
    };
    const { data } = await axios.post(`${API}/add/${type}`, body, header);
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USER_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getUser = (type) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.get(`${API}/database/${type}`, header);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const updateUser =
  (id, name, email, phone, type) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });
      const header = {
        "Content-Type": "application/json",
      };
      const body = {
        id,
        name,
        email,
        phone,
      };
      const { data } = await axios.post(`${API}/update/${type}`, body, header);

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILED,
        payload: error.response.data.message,
      });
    }
  };

export const delUser = (id, type) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const header = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.delete(`${API}/delete/${type}/${id}`, header);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILED,
      payload: error.response.data.message,
    });
  }
};
