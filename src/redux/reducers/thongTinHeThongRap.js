import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { removeLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { http } from "../../utils/baseUrl";

const initialState = {
  dataCumRap: [],
  cumRapChieu: [],
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
    CumRapChieu: (state, { type, payload }) => {
      {
        state.cumRapChieu = payload;
      }
    },
  },
});

export const { layDataFilm, CumRapChieu } = cumRapChieuPhim.actions;
export default cumRapChieuPhim.reducer;
export const getCumRapPhim = () => async (dispatch) => {
  const getCumRap = await http.get(
    "/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01"
  );
  console.log("cumRap", getCumRap.data.content);
  dispatch(layDataFilm(getCumRap.data.content));
};

export const getHeThongRapPhim = (maHeThongRap) => async (dispatch) => {
  const getHeThongRap = await http.get(
    `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
  );
  dispatch(CumRapChieu(getHeThongRap.data.content));
};
