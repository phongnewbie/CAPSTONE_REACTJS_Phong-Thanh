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
export const callApiDanhSachPhim = () => async (dispatch) => {
  const getApiFilm = await axios({
    method: "GET",
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
    headers: {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
    },
  });
  dispatch(layDanhSachFilm(getApiFilm.data.content));
};

export const callApiThemPhim = (data) => async (dispatch) => {
  try {
    const getApiThemFilm = await http.post(
      "/QuanLyPhim/ThemPhimUploadHinh",
      data
    );
    alert("Thêm phim thành công");
    history.push("/admin/films");
    console.log("phim mới", getApiThemFilm);
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
    alert("Xóa phim thành công");
    dispatch(layDanhSachFilm());
  } catch (err) {
    alert("Không xóa phim được !");
  }
};
