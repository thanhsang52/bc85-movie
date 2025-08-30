import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listTheaters: [],
  schedules: [],
  selectedTheater: null,
};

const theaterSlice = createSlice({
  name: "theaterSlice",
  initialState,
  reducers: {
    setListTheatersAction: (state, action) => {
      state.listTheaters = action.payload;
    },
    setSchedulesAction: (state, action) => {
      state.schedules = action.payload;
    },
    setSelectedTheaterAction: (state, action) => {
      state.selectedTheater = action.payload;
    },
  },
});

export const { setListTheatersAction, setSchedulesAction, setSelectedTheaterAction } = theaterSlice.actions;

export default theaterSlice.reducer;