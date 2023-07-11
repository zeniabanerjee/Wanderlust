import {
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
  ADMIN_FAILED,
} from "../constants/loginAdminConstants";
import axios from "axios";

const URL = process.env.REACT_APP_NODE_API;

export const getUsers = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REQUEST,
    });

    const config = { "Content-type": "application/json" };
    const body = {
      email,
      password,
      type: "",
    };

    const { data } = await axios.post(`${URL}/login/Admin`, body, config);

    dispatch({
      type: ADMIN_SUCCESS,
      payload: data,
    });
    if (data?.success) {
      localStorage.setItem("userDetails", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: ADMIN_FAILED,
      payload: error.response.data.message,
    });
  }
};
