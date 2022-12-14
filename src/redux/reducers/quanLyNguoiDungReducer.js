import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";
import { history } from "../../utils/history";

const initialState = {
  dataNguoiDung: [],
  dsNguoiDung: [],
  thongTinNguoiDung: {},
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
    layThongTinNguoiDung: (state, { type, payload }) => {
      {
        state.thongTinNguoiDung = payload;
      }
    },
  },
});

export const { layDataNguoiDung, laydsNguoiDung, layThongTinNguoiDung } =
  quanLyNguoiDungReducer.actions;

export default quanLyNguoiDungReducer.reducer;

export const getThongTinNguoiDung = () => async (dispatch) => {
  const getApiNguoiDung = await http.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  dispatch(layDataNguoiDung(getApiNguoiDung.data.content));
};

export const getInfoUser = (taiKhoan) => async (dispatch) => {
  const getApiThongTinNguoiDung = await http.post(
    `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
  );
  dispatch(layThongTinNguoiDung(getApiThongTinNguoiDung.data.content));
};

export const getEditUser = (taiKhoan) => async (dispatch) => {
  try {
    const getApiEditUser = await http.post(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      taiKhoan
    );
    console.log("ok", getApiEditUser.data.content);
    alert("Cập nhật thành công");
    history.push("/admin/quanly");
    dispatch(layThongTinNguoiDung());
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
