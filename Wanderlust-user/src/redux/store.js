import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import tripPackageSlice from "./slices/tripPackageSlice";
import bookingSlice from "./slices/bookingSlice";
import featureSlice from "./slices/featureSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    tripPackage: tripPackageSlice,
    booking: bookingSlice,
    feature: featureSlice,
  },
});

export default store;
