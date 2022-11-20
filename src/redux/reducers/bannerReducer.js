import { createSlice } from "@reduxjs/toolkit";
import { removeLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import axios from "axios";
const initialState = {
  dsBannerFilm: [],
};
console.log(initialState);
const bannerReducer = createSlice({
  name: "bannerReducer",
  initialState,
  reducers: {
    getDsBannerFilm: (state, { type, payload }) => {
      {
        state.dsBannerFilm = payload;
      }
    },
  },
});

export const { getDsBannerFilm } = bannerReducer.actions;
export default bannerReducer.reducer;
export const callDanhSachBanner = () => async (dispatch) => {
  const recieveBannerApi = await axios({
    method: "GET",
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
  });
  console.log(recieveBannerApi.data.content);
  dispatch(getDsBannerFilm(recieveBannerApi.data.content));
};
