import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_HOST;

const nameSpace = "feature";

const initialState = {
  featureData: null,
  loading: false,
  error: null,
  success: false,
  filterFeatureData: null,
};

export const getFeature = createAsyncThunk(
  `${nameSpace}/getFeature`,
  async (featureName, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API}get-feature/${featureName}`);
      if (result) return result.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getFilteredFeature = createAsyncThunk(
  `${nameSpace}/getFilteredFeature`,
  async (filterRequirements, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API}get-filtered-feature/trip-package`,
        filterRequirements
      );
      if (result) return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const featureSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFeature.pending, (state, action) => {
      state.featureData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getFeature.fulfilled, (state, action) => {
      state.featureData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getFeature.rejected, (state, action) => {
      state.featureData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(getFilteredFeature.pending, (state, action) => {
      state.filterFeatureData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getFilteredFeature.fulfilled, (state, action) => {
      state.filterFeatureData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getFilteredFeature.rejected, (state, action) => {
      state.filterFeatureData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default featureSlice.reducer;
