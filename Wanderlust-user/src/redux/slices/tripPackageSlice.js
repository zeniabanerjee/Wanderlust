import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_HOST;

const nameSpace = "tripPackage";

const initialState = {
  tripPackageData: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllPackages = createAsyncThunk(
  `${nameSpace}/getAllPackages`,
  async () => {
    try {
      const result = await axios.get(`${API}get-module/trip-package`);
      if (result) return result;
      return result;
    } catch (err) {
      return err.response.data.message;
    }
  }
);

export const getPackagesById = createAsyncThunk(
  `${nameSpace}/getPackagesById`,
  async (tripId, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${API}get-trip-details/trip-package/${tripId}`
      );

      if (result) return result.data;

      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const tripPackageSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllPackages.pending, (state, action) => {
      state.tripPackageData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllPackages.fulfilled, (state, action) => {
      state.tripPackageData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getAllPackages.rejected, (state, action) => {
      state.tripPackageData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(getPackagesById.pending, (state, action) => {
      state.tripPackageData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getPackagesById.fulfilled, (state, action) => {
      state.tripPackageData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getPackagesById.rejected, (state, action) => {
      state.tripPackageData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default tripPackageSlice.reducer;
