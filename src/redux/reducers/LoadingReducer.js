import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const LoadingReducer = createSlice({
  name: "loadingReducer",
  initialState,
  reducers: {
    displayLoading: (state, { type, payload }) => {
      state.isLoading = true;
    },
    hideLoading: (state, { type, payload }) => {
      state.isLoading = false;
    },
  },
});

export const { displayLoading, hideLoading } = LoadingReducer.actions;

export default LoadingReducer.reducer;
