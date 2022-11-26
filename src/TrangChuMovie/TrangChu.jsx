import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callDanhSachBanner } from "../redux/reducers/bannerReducer";
import { callApiDanhSachPhim } from "../redux/reducers/PhimReducer";
import { getFilmDataList } from "../redux/reducers/rapChieuPhim";
import "./dsPhim.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styleSlick from "./multipleRowSlick.css";
import { Box } from "@mui/material";
import { List } from "@mui/material";
import { styled } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Grid } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { event } from "jquery";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";

import { Typography } from "@mui/material";
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
export default function TrangChu() {
  let timeout = null;
  const apiBanner = useSelector((state) => state.bannerReducer.dsBannerFilm);
  const apiDsPhim = useSelector((state) => state.PhimReducer.danhSachPhim);
  const apiFilm = useSelector((state) => state.rapChieuPhim.dataRap);
  const [dataRapFilm, SetDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  let dispatch = useDispatch();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

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
  const getDsFilm = async () => {
    try {
      dispatch(apiFilm);
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
      getDsFilm();
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
  const dataFilm = {
    height: "200px",
    width: "200px",
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

  const renderCinemaInfo = (item) => {
    return apiFilm.map((item, index) => {
      return (
        <div key={index}>
          <img src={item.logo} />
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
        <List>{renderCinemaInfo()}</List>
      </div>
    </div>
  );
}
