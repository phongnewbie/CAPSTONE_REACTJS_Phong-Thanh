import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApiDanhSachPhim } from "../../redux/reducers/PhimReducer";
import "./dsPhim.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styleSlick from "./multipleRowSlick.css";
import { history } from "../../utils/history";

export default function DsPhim() {
  let timeout = null;
  const apiDsPhim = useSelector((state) => state.PhimReducer.danhSachPhim);
  let dispatch = useDispatch();

  const getApiPhim = async () => {
    try {
      dispatch(callApiDanhSachPhim());
    } catch (err) {
      console.log(err);
    }
  };

  if (timeout != null) {
    clearTimeout(timeout);
  }

  useEffect(() => {
    timeout = setTimeout(() => {
      getApiPhim();
    }, 1000);
  }, []);

  const renderDsPhim = () => {
    return apiDsPhim.map((item, index) => {
      return (
        <div key={index} className="mt-3 mb-3">
          <div className="phim_warp">
            <img
              // width={210}
              height={300}
              src={item.hinhAnh}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title phim_name">{item.tenPhim}</h5>
              <p className="phim_mota">{item.moTa}</p>
              <div className="btn_muave-warp">
                <button
                  onClick={() => {
                    history.push(`/chitietphim/${item.maPhim}`);
                  }}
                  className="btn_muave btn--primary"
                >
                  Mua vé
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slick-dsphim" style={{ backgroundColor: "#f5f5f5" }}>
      <Slider {...settings}>{renderDsPhim()}</Slider>
    </div>
  );
}
