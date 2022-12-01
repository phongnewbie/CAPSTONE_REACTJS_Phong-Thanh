import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetProfile } from "../../redux/reducers/userReducer";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { NavLink } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import "./SignUp";

export default function () {
  let dispatch = useDispatch();
  let infoUser = useSelector((state) => state.userReducer.infoUser);
  console.log(infoUser);

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
          <div
            style={{
              backgroundColor: "#f9fbfd",
              marginTop: "100px",
            }}
            className="card signup-warp"
          >
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

              <div className="row w-full">
                <div className="col-12">
                  <h4 style={{ padding: "15px" }}>Lịch sử đặt vé</h4>
                </div>
                {infoUser.thongTinDatVe?.map((ve, index) => {
                  const seats = _.first(ve.danhSachGhe);
                  return (
                    <div key={index} className="col-6">
                      <div className="card-info ">
                        <p>
                          Ngày đặt :{" "}
                          {moment(ve.ngayDat).format("DD/MM/YY - HH:MM A")}{" "}
                        </p>
                        <h6>Tên phim: {ve.tenPhim}</h6>
                        <h6>
                          {seats.tenHeThongRap} - {seats.tenRap}
                        </h6>
                        <p>
                          Thời lượng : {ve.thoiLuongPhim} phút, giá vé :{" "}
                          {ve.giaVe.toLocaleString()}
                        </p>
                        <p>
                          Số ghế đặt :{" "}
                          {ve.danhSachGhe?.map((ghe, index) => {
                            return <span key={index}> [{ghe.tenGhe}]</span>;
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Chưa đăng nhập</h1>
      )}
    </div>
  );
}
