import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
export default function MainLayout() {
  return (
    <div style={{ backgroundColor: "cornflowerblue" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
