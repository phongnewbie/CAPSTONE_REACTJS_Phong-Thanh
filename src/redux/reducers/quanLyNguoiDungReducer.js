import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";
import { history } from "../../utils/history";

const initialState = {
  dataNguoiDung: [],
  dsNguoiDung: [],
};

const quanLyNguoiDungReducer = createSlice({
  name: "quanLyNguoiDungReducer",
  initialState,
  reducers: {
    layDataNguoiDung: (state, { type, payload }) => {
      {
        state.dataNguoiDung = payload;
      }
    },
    laydsNguoiDung: (state, { type, payload }) => {
      {
        state.dsNguoiDung = payload;
      }
    },
  },
});

export const { layDataNguoiDung, laydsNguoiDung } =
  quanLyNguoiDungReducer.actions;

export default quanLyNguoiDungReducer.reducer;

export const getThongTinNguoiDung = () => async (dispatch) => {
  const getApiNguoiDung = await http.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  dispatch(layDataNguoiDung(getApiNguoiDung.data.content));
};

export const getEditUser = () => async (dispatch) => {
  try {
    const getApiEditUser = await http.post(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung"
    );
    dispatch(layDataNguoiDung(getApiEditUser.data.content));
  } catch (err) {
    console.log(err.response?.data.content);
  }
};

export const getDsNguoiDung =
  (taiKhoan = "") =>
  async (dispatch) => {
    if (taiKhoan.trim() != "") {
      const getApiDsNguoiDung = await http.get(
        `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`
      );
      dispatch(laydsNguoiDung(getApiDsNguoiDung.data.content));
    } else {
      const getApiDsNguoiDung = await http.get(
        "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
      );
      dispatch(laydsNguoiDung(getApiDsNguoiDung.data.content));
    }
  };

export const callApiXoaNguoiDung = (taiKhoan) => async (dispatch) => {
  try {
    const getApiXoaUser = await http.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
    const getApiDsNguoiDung = await http.get(
      "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
    );
    alert("Xóa người dùng thành công");
    dispatch(laydsNguoiDung(getApiDsNguoiDung.data.content));
  } catch (err) {
    alert(err.response?.data.content);
  }
};

export const callSignUp = (userSignUp) => async (dispatch) => {
  try {
    const apiSignUp = await http.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      userSignUp
    );

    // console.log(apiSignUp);

    alert("Đăng ký thành công");
    history.push("/admin/quanly");
  } catch (err) {
    alert(err.response?.data.content);
  }
};
