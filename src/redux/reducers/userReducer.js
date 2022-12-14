import { createSlice } from "@reduxjs/toolkit";
import {
  getStringLocal,
  removeLocal,
  saveStringLocal,
} from "../../utils/config";
import { history } from "../../utils/history";
import { http } from "../../utils/baseUrl";
import { USER_LOGIN } from "../../utils/constant";

const initialState = {
  infoUser: {},
  updateUser: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfile: (state, { type, payload }) => {
      state.infoUser = payload;
    },
    getUpdateUser: (state, { type, payload }) => {
      state.updateUser = payload;
    },
  },
});

export const { getProfile, getUpdateUser } = userReducer.actions;

export default userReducer.reducer;

export const callGetProfile = async (dispatch) => {
  try {
    const apiGetProfile = await http.post("/QuanLyNguoiDung/ThongTinTaiKhoan");

    // console.log("user", apiGetProfile.data.content);
    dispatch(getProfile(apiGetProfile.data.content));
  } catch (err) {
    //xóa localStorage
    removeLocal(USER_LOGIN);
  }
};

//closure function
export const callSignUp = (userSignUp) => async (dispatch) => {
  try {
    const apiSignUp = await http.post("/QuanLyNguoiDung/DangKy", userSignUp);

    // console.log(apiSignUp);

    // đẩy qua trang login
    alert("Đăng ký thành công");
    history.push("/login");
  } catch (err) {
    alert(err.response?.data.content);
  }
};

export const callLogin = (userLogin) => async (dispatch) => {
  try {
    const apiLogin = await http.post("/QuanLyNguoiDung/DangNhap", userLogin);

    saveStringLocal(USER_LOGIN, apiLogin.data.content.accessToken);

    history.push("/");
  } catch (err) {
    return new Promise((resolve, reject) =>
      resolve({ isError: true, message: err.response.data.content })
    );
  }
};

export const callUpdateUser = (value) => async (dispatch) => {
  try {
    const apiUpdateUser = await http.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      value
    );

    console.log(apiUpdateUser.data.content);
    dispatch(getUpdateUser(apiUpdateUser.data.content));
    alert("Cập nhật thành công");
    history.push("/info");
  } catch (err) {
    console.log(err.response?.data.content);
  }
};
