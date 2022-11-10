import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useRoute from "../hooks/useRoute";
import { Result } from "antd";
import moment from "moment/moment";
import "bootstrap/dist/css/bootstrap.min.css";
import { USER_LOGIN } from "../utils/constant";
let timeOut = null;
export default function TrangChu() {
  // const {
  //   params,
  //   navigate,
  //   searchParams: [searchParams, setSearchParams],
  // } = useRoute();
  // //const keyWord = searchParams.has("word") ? searchParams.get("word") : "";

  // const getApi = async () => {
  //   try {
  //     const apiFilm = await axios({
  //       method: "GET",
  //       data: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
  //     });
  //     dispatch(getApi(apiFilm));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // if (timeOut != null) {
  //   clearTimeout(timeOut);
  // }

  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  const [dataThongTinLichChieu, setDataThongTinLichChieu] = useState([]);
  let dispatch = useDispatch();
  const params = useSearchParams();
  const navigate = useNavigate();
  let timeout = null;
  let isLogin = localStorage.getItem(USER_LOGIN);
  const [listPhim, setDSphim] = useState([]);
  let listFilm = useSelector((state) => state.da);
  return (
    <div class="dropdown">
      <a
        class="btn btn-secondary dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown link
      </a>

      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
    </div>
  );
}
