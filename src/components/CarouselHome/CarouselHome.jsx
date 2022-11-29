import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callDanhSachBanner } from "../../redux/reducers/bannerReducer";

export default function CarouselHome() {
  let timeout = null;
  const apiBanner = useSelector((state) => state.bannerReducer.dsBannerFilm);
  let dispatch = useDispatch();

  const getApiBanner = async () => {
    try {
      dispatch(callDanhSachBanner());
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

  return <Carousel autoplay>{renderBanner()}</Carousel>;
}
