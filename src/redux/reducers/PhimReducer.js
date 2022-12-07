import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";
import { USER_LOGIN } from "../../utils/constant";

const initialState = {
  danhSachPhim: [],
  themPhim: {},
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
  },
});

export const { layDanhSachFilm, themFilm } = phimReducer.actions;
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
    console.log("phim mới", getApiThemFilm);
  } catch (err) {
    alert("Không thêm phim được !");
  }
};
