import React from "react";
import CarouselHome from "../components/CarouselHome/CarouselHome";
import CumRapChieu from "../components/CumRapChieu/CumRapChieu";
import DsPhim from "../components/DsPhim/DsPhim";

export default function TrangChu() {
  return (
    <div style={{ marginTop: "70px" }}>
      <CarouselHome />
      <DsPhim />
      <CumRapChieu />
    </div>
  );
}
