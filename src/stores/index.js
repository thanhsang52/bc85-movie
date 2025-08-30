import { configureStore, createSlice } from "@reduxjs/toolkit";

import movieSlice from "./movie/index.js";
import userSlice from "./user/index.js";
import theaterSlice from "./theater/index.js";

export const store = configureStore({
  reducer: {
    // là nơi chứa các reducer của ứng dụng
    movieSlice: movieSlice,
    userSlice: userSlice,
    theaterSlice: theaterSlice,
  },
});

export default store;
