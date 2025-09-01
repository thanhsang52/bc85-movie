import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listTheaters: [],
  schedules: [],
  selectedTheater: null,
  ticketRoom: null,
  selectedSeats: [],
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
    setTicketRoomAction: (state, action) => {
      state.ticketRoom = action.payload;
    },
    setSelectedSeatsAction: (state, action) => {
      state.selectedSeats = action.payload;
    },
    addSeatAction: (state, action) => {
      state.selectedSeats.push(action.payload);
    },
    removeSeatAction: (state, action) => {
      state.selectedSeats = state.selectedSeats.filter(seat => seat.maGhe !== action.payload);
    },
    clearSelectedSeatsAction: (state) => {
      state.selectedSeats = [];
    },
  },
});

export const { 
  setListTheatersAction, 
  setSchedulesAction, 
  setSelectedTheaterAction,
  setTicketRoomAction,
  setSelectedSeatsAction,
  addSeatAction,
  removeSeatAction,
  clearSelectedSeatsAction
} = theaterSlice.actions;

export default theaterSlice.reducer;