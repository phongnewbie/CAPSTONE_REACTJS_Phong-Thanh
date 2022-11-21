import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachPhim: [],
};

const phimReducer = createSlice({
  name: "phimReducer",
  initialState,
  reducers: {
    layDanhSachFilm: (state, { type, payload }) => {
      state.danhSachPhim = payload;
    },
  },
});
export const { layDanhSachFilm } = phimReducer.actions;
export default phimReducer.reducer;
export const callApiDanhSachPhim = () => async (dispatch) => {
  const getApiFilm = await axios({
    method: "GET",
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
  });
  console.log(getApiFilm.data.content);
  dispatch(layDanhSachFilm(getApiFilm.data.content));
};
