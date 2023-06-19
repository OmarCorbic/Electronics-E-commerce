import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  progress: 0,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setHTTPProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export default progressSlice.reducer;
export const { setHTTPProgress } = progressSlice.actions;
