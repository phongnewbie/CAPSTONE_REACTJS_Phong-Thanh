import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { removeLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { http } from "../../utils/baseUrl";

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
  const getFilmData = await http.get("/QuanLyRap/LayThongTinHeThongRap");
  console.log(getFilmData.data.content);
  dispatch(layDataFilm(getFilmData.data.content));
};

export const getHeThongRap = () => {
  return http.get("/QuanLyRap/LayThongTinHeThongRap");
};

export const getCumRap = (maRapChieu) => {
  return http.get(
    `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRapChieu}`
  );
};

export const getTaoLichChieu = (thongTinLichChieu) => {
  return http.post("/QuanLyDatVe/TaoLichChieu", thongTinLichChieu);
};
