import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { removeLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { http } from "../../utils/baseUrl";
const initialState = {
  danhSachPhim: [],
};

const PhimReducer = createSlice({
  name: "PhimReducer",
  initialState,
  reducers: {
    layDanhSachFilm: (state, { type, payload }) => {
      state.danhSachPhim = payload;
    },
  },
});
export const { layDanhSachFilm } = PhimReducer.actions;
export default PhimReducer.reducer;
export const callApiDanhSachPhim = async (dispatch) => {
  try {
    const getApiFilm = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim` ,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    dispatch(layDanhSachFilm(getApiFilm.data.content));
  } catch (err) {
    console.log(err);
  }
};

