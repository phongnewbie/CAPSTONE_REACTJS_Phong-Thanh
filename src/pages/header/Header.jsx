import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callGetProfile } from "../../redux/reducers/userReducer";
import { USER_LOGIN } from "../../utils/constant";
import { removeLocal } from "../../utils/config";

import "./header.css";
import _ from "lodash";

export default function Header() {
  let dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userReducer.infoUser);
  const [srHeader, setSrHeader] = useState(1);
  useEffect(() => {
    dispatch(callGetProfile);
  }, []);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <li className="nav-item header__nav-item header__nav-item--prevent active ">
            <NavLink className="nav-link header-link text-white" to="/signup">
              {" "}
              SignUp{" "}
            </NavLink>
          </li>
          <li className="nav-item active ">
            <NavLink className="nav-link header-link text-white" to="/login">
              {" "}
              LogIn{" "}
            </NavLink>
          </li>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <li className="nav-item active ">
          <NavLink
            className="nav-link header__nav-item header__nav-item--prevent header-link text-white"
            to="/info"
          >
            {" "}
            Hi! {userLogin.hoTen}{" "}
          </NavLink>
        </li>
        <li className="nav-item active ">
          <NavLink
            onClick={() => {
              removeLocal(USER_LOGIN);
              // window.location.reload();
              setSrHeader(srHeader + 1);
            }}
            className="nav-link header-link text-white"
            to="/login"
          >
            {" "}
            Đăng xuất
          </NavLink>
        </li>
      </Fragment>
    );
  };

  return (
    <div className="d-flex justify-between header-nav">
      <nav className=" container navbar navbar-expand-lg  ">
        <NavLink to="/" className="justify">
          {" "}
          <img
            className="img-logo"
            width={50}
            src="data:image/png;base64,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"
            alt=""
          />{" "}
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul style={{ fontSize: "16px" }} className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <a
                href="#phimDangChieu"
                className="nav-link header-link text-white font-weight-bolder"
              >
                {" "}
                Phim đang chiếu
              </a>
            </li>
            <li className="nav-item active ">
              <a
                href="#phimSapChieu"
                className="nav-link header-link text-white font-weight-bolder"
              >
                {" "}
                Phim sắp chiếu
              </a>
            </li>
            <li className="nav-item active ">
              <a
                href="#lichChieu"
                className="nav-link header-link text-white font-weight-bolder"
              >
                {" "}
                Lịch chiếu
              </a>
            </li>
          </ul>
          <div>
            <ul className="navbar-nav mr-auto">
              {renderLogin()}
              {/* <li className="nav-item active ">
                <NavLink
                  className="nav-link header-link text-white"
                  to="/login"
                >
                  {" "}
                  LogIn{" "}
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
