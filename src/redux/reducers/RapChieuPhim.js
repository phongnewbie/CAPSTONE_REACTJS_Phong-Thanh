import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { removeLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
const initialState = {
  dataRap: [],
};

const rapChieuPhim = createSlice({
  name: "rapChieuPhim",
  initialState,
  reducers: {
    layDataFilm: (state, { type, payload }) => {
      {
        state.dataRap = payload;
      }
    },
  },
});

export const { layDataFilm } = rapChieuPhim.actions;
export default rapChieuPhim.reducer;
export const getFilmDataList = () => async (dispatch) => {
  const getFilmData = await axios({
    method: "GET",
    url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`,
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
  });
  console.log(getFilmData.data.content);
  dispatch(layDataFilm(getFilmData.data.content));
};
