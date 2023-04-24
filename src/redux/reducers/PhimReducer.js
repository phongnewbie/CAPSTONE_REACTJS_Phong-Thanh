import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";
import { USER_LOGIN } from "../../utils/constant";
import { history } from "../../utils/history";

const initialState = {
  danhSachPhim: [],
  themPhim: {},
  thongTinPhim: {},
};

const phimReducer = createSlice({
  name: "phimReducer",
  initialState,
  reducers: {
    layDanhSachFilm: (state, { type, payload }) => {
      state.danhSachPhim = payload;
    },
    themFilm: (state, { type, payload }) => {
      state.themPhim = payload;
    },
    thongTinPhim: (state, { type, payload }) => {
      state.thongTinPhim = payload;
    },
  },
});

export const { layDanhSachFilm, themFilm, thongTinPhim } = phimReducer.actions;
export default phimReducer.reducer;
export const callApiDanhSachPhim =
  (tenPhim = "") =>
  async (dispatch) => {
    if (tenPhim.trim() != "") {
      const getApiFilm = await http.get(
        `/QuanLyPhim/LayDanhSachPhim?maNhom=GP00&tenPhim=${tenPhim}`
      );
      dispatch(layDanhSachFilm(getApiFilm.data.content));
    } else {
      const getApiFilm = await http.get(
        "/QuanLyPhim/LayDanhSachPhim?maNhom=GP00"
      );
      dispatch(layDanhSachFilm(getApiFilm.data.content));
    }
  };

export const callApiThemPhim = (data) => async (dispatch) => {
  try {
    const getApiThemFilm = await http.post(
      "/QuanLyPhim/ThemPhimUploadHinh",
      data
    );
    alert("Thêm phim thành công");
    history.push("/admin/films");
  } catch (err) {
    alert("Không thêm phim được !");
  }
};

export const callApiLayThongTinPhim = (maPhim) => async (dispatch) => {
  try {
    const getApiLayThongTinPhim = await http.get(
      `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
    );
    dispatch(thongTinPhim(getApiLayThongTinPhim.data.content));
    // console.log(getApiLayThongTinPhim.data.content);
  } catch (err) {
    alert("Không Edit phim được !");
  }
};

export const callApiCapNhatPhim = (data) => async (dispatch) => {
  try {
    const getApiCapNhatPhim = await http.post(
      "/QuanLyPhim/CapNhatPhimUpload",
      data
    );
    alert("Cập nhật phim thành công");
    dispatch(layDanhSachFilm());
    history.push("/admin/films");
  } catch (err) {
    alert("Không Cập nhật phim được !");
  }
};

export const callApiXoaPhim = (maPhim) => async (dispatch) => {
  try {
    const getApiXoaPhim = await http.delete(
      `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
    );
    const getApiFilm = await http.get(
      "/QuanLyPhim/LayDanhSachPhim?maNhom=GP00"
    );
    alert("Xóa phim thành công");
    dispatch(layDanhSachFilm(getApiFilm.data.content));
  } catch (err) {
    alert("Không xóa phim được !");
  }
};
