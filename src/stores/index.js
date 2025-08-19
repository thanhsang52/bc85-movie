import { configureStore, createSlice } from "@reduxjs/toolkit";

import movieSlice from "./movie/index.js";
import userSlice from "./user/index.js";

export const store = configureStore({
  reducer: {
    // là nơi chứa các reducer của ứng dụng
    movieSlice: movieSlice,
    userSlice: userSlice,
  },
});

export default store;
