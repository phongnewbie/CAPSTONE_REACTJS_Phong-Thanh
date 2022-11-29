import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../pages/Header";
import Footer from "../../pages/Footer";

export default function LayoutUser() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
