// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      return [...action.payload]; // Directly set the payload as the new state
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
