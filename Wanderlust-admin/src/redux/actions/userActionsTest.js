import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from "../constants/userConstantTest.js";
const BASE_URL = process.env.REACT_APP_NODE_API;

export const logInUser = (email, password, type) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const header = {
      "Content-Type": "application/json",
    };
    const body = {
      email,
      password,
    };

    const { data } = await axios.post(
      `${BASE_URL}/login/${type}`,
      body,
      header
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.response.data.message,
    });
  }
};
