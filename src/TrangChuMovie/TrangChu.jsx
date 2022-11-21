import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callDanhSachBanner } from "../redux/reducers/bannerReducer";
import { callApiDanhSachPhim } from "../redux/reducers/PhimReducer";
import "./dsPhim.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styleSlick from "./multipleRowSlick.css";

export default function TrangChu() {
  let timeout = null;
  const apiBanner = useSelector((state) => state.bannerReducer.dsBannerFilm);
  const apiDsPhim = useSelector((state) => state.PhimReducer.danhSachPhim);

  let dispatch = useDispatch();

  const getApiBanner = async () => {
    try {
      dispatch(callDanhSachBanner());
    } catch (err) {
      console.log(err);
    }
  };

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
      getApiBanner();
      getApiPhim();
    }, 1000);
  }, []);

  const contentStyle = {
    height: "600px",
    color: "#fff",
    lineHeight: "600px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };

  const renderBanner = () => {
    return apiBanner.map((item, index) => {
      return (
        <div key={index} className="w-100">
          <div
            className="card"
            style={{
              ...contentStyle,
              backgroundImage: `url(${item.hinhAnh})`,
            }}
          ></div>
        </div>
      );
    });
  };

  const renderDsPhim = () => {
    return apiDsPhim.map((item, index) => {
      return (
        <div key={index} className="mt-3">
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
              <button className="phim_muave btn_muave btn--primary">
                Mua vé
              </button>
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
    <div style={{ backgroundColor: "#fff" }}>
      <Carousel autoplay>{renderBanner()}</Carousel>
      <div className="slick-dsphim">
        <Slider {...settings}>{renderDsPhim()}</Slider>
      </div>
      <div className="container mt-5">
        {/* <div className="row">{renderDsPhim()}</div> */}
      </div>
    </div>
  );
}
