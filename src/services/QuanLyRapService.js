import React, { Component } from "react";

class QuanLyRapService extends Component {
  layThongTinHeThongRap = () => {
    return this.get("/QuanLyRap/LayThongTinHeThongRap");
  };
}

export default QuanLyRapService;
