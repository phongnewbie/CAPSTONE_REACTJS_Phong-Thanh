import React, { useEffect, useState } from "react";
import "./footer.css";
import { useDispatch, useSelector } from "react-redux";
import { getFilmDataList } from "../../redux/reducers/RapChieuPhim";

export default function Footer() {
  let timeout = null;
  let dispatch = useDispatch();
  const apiFilm = useSelector((state) => state.rapChieuPhim.dataRap);

  const getDsFilm = async () => {
    try {
      dispatch(getFilmDataList());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    timeout = setTimeout(() => {
      getDsFilm();
    }, 1000);
  }, []);

  const renderCinemaInfo = () => {
    return apiFilm.map((item, index) => {
      return (
        <div key={index} className="footer-rap mt-2">
          <div>
            <img src={item.logo} className="footer-rap" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="border-footer mt-5">
      <div className="container">
        <div className="footer__warp"></div>
      </div>
      <div className="footer__info">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="footer__heading">CHĂM SÓC KHÁCH HÀNG</div>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Trung Tâm Trợ Giúp
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Shopee Blog
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Shopee Mall
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Hướng Dẫn Mua Hàng
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Hướng Dẫn Bán Hàng
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <div className="footer__heading">ĐỐI TÁC RẠP CHIẾU</div>
              {renderCinemaInfo()}
            </div>
            <div className="col-3">
              <div className="footer__heading">THEO DÕI CHÚNG TÔI TRÊN</div>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="" className="footer__link">
                    <i className="footer-icon fa-brands fa-facebook"></i>
                    Facebook
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    <i className="footer-icon fa-brands fa-instagram-square"></i>
                    Instagram
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    <i className="footer-icon fa-brands fa-invision"></i>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <div className="footer__heading">TẢI ỨNG DỤNG NGAY THÔI</div>
              <div className="footer__downl">
                <img src="./imgs/qr.png" alt="" className="footer__qr" />
                <div className="footer__downl-app">
                  <img
                    src="./imgs/appstore.png"
                    alt=""
                    className="footer__downl-app-img"
                  />
                  <img
                    src="./imgs/chplay.png"
                    alt=""
                    className="footer__downl-app-img"
                  />
                  <img
                    src="./imgs/app.png"
                    alt=""
                    className="footer__downl-app-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div>
              <img
                className="mb-3"
                style={{ width: "330px" }}
                src="./imgs/bo-cong-thuong.png"
              />
            </div>
            <span className="footer__label">
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
              Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng
              đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            </span>
            <span className="footer__label">
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại
              liên hệ: 024 73081221 (ext 4678)
            </span>
            <span className="footer__label">
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội
              cấp lần đầu ngày 10/02/2015
            </span>
            <span className="footer__label">
              © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
