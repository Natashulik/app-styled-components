import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTime: 0,
};

export const playbarSlice = createSlice({
  name: "playbar",
  initialState,
  reducers: {
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

export const { setCurrentTime } = playbarSlice.actions;

export default playbarSlice.reducer;
