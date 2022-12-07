import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../pages/header/Header";
import Footer from "../../pages/footer/Footer";

export default function LayoutUser() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
