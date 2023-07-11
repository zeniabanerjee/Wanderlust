import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_HOST;

const nameSpace = "user";

const initialState = {
  updatedUserData: null,
  FrontendUserData: localStorage.getItem("FrontendUserData")
    ? JSON.parse(localStorage.getItem("FrontendUserData"))
    : null,
  loading: false,
  error: null,
  success: false,
};

export const signUp = createAsyncThunk(
  `${nameSpace}/signUp`,
  async (userData, { rejectWithValue }, thunkAPI) => {
    try {
      const result = await axios.post(`${API}register/Frontend-user`, userData);
      if (result) return result.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const signIn = createAsyncThunk(
  `${nameSpace}/signIn`,
  async (userData, { rejectWithValue }, thunkAPI) => {
    try {
      const results = await axios.post(`${API}login/Frontend-user`, userData);
      if (results) {
        localStorage.setItem("FrontendUserData", JSON.stringify(results.data));
        return results;
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  `${nameSpace}/updateUser`,
  async (userData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API}update/${userData.type}/${userData.id}`,
        userData.formdata
      );
      if (result) {
        localStorage.removeItem("FrontendUserData");
        localStorage.setItem("FrontendUserData", JSON.stringify(result.data));
        return result;
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    updateFrontendUserData: (state, action) => {
      state.FrontendUserData = state.updatedUserData;
      state.updatedUserData = null;
    },
    updateUserDetails: (state) => {
      state.FrontendUserData = null;
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers(builder) {
    // For signUp
    builder.addCase(signUp.pending, (state, action) => {
      state.FrontendUserData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.FrontendUserData = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.FrontendUserData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // For signIn
    builder.addCase(signIn.pending, (state, action) => {
      state.success = false;
      state.FrontendUserData = null;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.FrontendUserData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.FrontendUserData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // For update user details
    builder.addCase(updateUser.pending, (state, action) => {
      state.success = false;
      state.updatedUserData = null;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updatedUserData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updatedUserData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default userSlice.reducer;
export const { updateFrontendUserData, updateUserDetails } = userSlice.actions;
