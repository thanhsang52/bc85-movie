//rxslice
import { createSlice } from "@reduxjs/toolkit";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";

const initialState = {
  infoUser: localStorageUtil.get(keysLocalStorage.INFO_USER) || null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setInfoUserAction: (state, action) => {
      state.infoUser = action.payload;
    },
    setLogoutAction: (state) => {
      // Clear user info in redux
      state.infoUser = null;
      // Clear user info in local storage
      localStorageUtil.remove(keysLocalStorage.INFO_USER);
    },
  },
});

export const { setInfoUserAction, setLogoutAction } = userSlice.actions;

export default userSlice.reducer;
