import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_HOST;

const nameSpace = "booking";

const initialState = {
  bookingData: null,
  loading: false,
  error: null,
  success: false,
};

export const createBooking = createAsyncThunk(
  `${nameSpace}/createBooking`,
  async (bookedData, { rejectWithValue }, thunkAPI) => {
    try {
      const result = await axios.post(`${API}trip-booking`, bookedData);
      if (result) return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getAllUserBooking = createAsyncThunk(
  `${nameSpace}/getAllUserBooking`,
  async (userId, { rejectWithValue }, thunkAPI) => {
    try {
      const result = await axios.get(`${API}user-all-booking/${userId}`);
      if (result) return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getUserBookingById = createAsyncThunk(
  `${nameSpace}/getUserBookingById`,
  async (bookedData, { rejectWithValue }, thunkAPI) => {
    try {
      const result = await axios.get(
        `${API}user-booking/${bookedData.userId}/${bookedData.bookingId}`
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
  reducers: {
    resetBooking: (state) => {
      state.bookingData = null;
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(createBooking.pending, (state, action) => {
      state.bookingData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.bookingData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.bookingData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(getAllUserBooking.pending, (state, action) => {
      state.bookingData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllUserBooking.fulfilled, (state, action) => {
      state.bookingData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getAllUserBooking.rejected, (state, action) => {
      state.bookingData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(getUserBookingById.pending, (state, action) => {
      state.bookingData = null;
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getUserBookingById.fulfilled, (state, action) => {
      state.bookingData = action.payload.data;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getUserBookingById.rejected, (state, action) => {
      state.bookingData = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default featureSlice.reducer;
export const { resetBooking } = featureSlice.actions;
