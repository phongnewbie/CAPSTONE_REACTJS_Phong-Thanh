import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetProfile } from "../../redux/reducers/userReducer";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { NavLink } from "react-router-dom";

export default function () {
  let dispatch = useDispatch();
  let infoUser = useSelector((state) => state.userReducer.infoUser);

  let userLocalStorage = getStringLocal(USER_LOGIN);

  useEffect(() => {
    //redux thunk
    dispatch(callGetProfile);
  }, []);

  return (
    <div>
      {userLocalStorage ? (
        // <h1>{infoUser.hoTen}</h1>
        <div className="container mt-5">
          <div className="card">
            <img className="card-img-top" src="holder.js/100x180/" alt />
            <div className="card-body row">
              <div className="col-6">
                <h4 className="card-title">Họ tên: {infoUser.hoTen}</h4>
                <h4 className="card-title">Tài khoản: {infoUser.taiKhoan}</h4>
                <h4 className="card-title">Mã nhóm: {infoUser.maNhom}</h4>
              </div>
              <div className="col-6">
                <h4 className="card-title">Email: {infoUser.email}</h4>
                <h4 className="card-title">Số điện thoại: {infoUser.soDT}</h4>
              </div>
              <NavLink
                style={{ width: "100%" }}
                className="text-right mr-5"
                to="/update"
              >
                {" "}
                cập nhật thông tin tài khoản{" "}
              </NavLink>
              <h4 style={{ padding: "15px" }}>Lịch sử đặt vé</h4>
            </div>
          </div>
        </div>
      ) : (
        <h1>Chưa đăng nhập</h1>
      )}
    </div>
  );
}
