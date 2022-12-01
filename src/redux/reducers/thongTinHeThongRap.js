import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { removeLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
const initialState = {
  dataCumRap: [],
};
// console.log(initialState.dataCumRap);

const cumRapChieuPhim = createSlice({
  name: "cumRapChieuPhim",
  initialState,
  reducers: {
    layDataFilm: (state, { type, payload }) => {
      {
        state.dataCumRap = payload;
      }
    },
  },
});

export const { layDataFilm } = cumRapChieuPhim.actions;
export default cumRapChieuPhim.reducer;
export const getCumRapPhim = () => async (dispatch) => {
  const getCumRap = await axios({
    method: "GET",
    url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
  });
  console.log("cumRap", getCumRap.data.content);
  dispatch(layDataFilm(getCumRap.data.content));
};
