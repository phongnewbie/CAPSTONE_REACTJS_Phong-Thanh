import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../utils/history";
import { displayLoading, hideLoading } from "./LoadingReducer";
import { clearVe } from "./quanLyDatVeReducer";

import { http } from "../../utils/baseUrl";

const initialState = {
  thongTinDatVe: {
    maLichChieu: 0,
    danhSachVe: [],
  },
};

const datVeReducer = createSlice({
  name: "datVeReducer",
  initialState,
  reducers: {
    getDatVe: (state, { type, payload }) => {
      state.thongTinDatVe = payload;
    },
  },
});

export const { getDatVe } = datVeReducer.actions;

export default datVeReducer.reducer;

export const callDatVe = (datVe) => async (dispatch) => {
  try {
    dispatch(displayLoading());
    const apiDatVe = await http.post("/QuanLyDatVe/DatVe", datVe);
    dispatch(getDatVe(apiDatVe));
    alert("Đặt vé thành công");
    // await dispatch(initialState.thongTinDatVe.maLichChieu);
    await dispatch(clearVe());
    dispatch(hideLoading());
    history.push("/info");
  } catch (err) {
    dispatch(hideLoading());
    console.log(err.response.data);
  }
};
