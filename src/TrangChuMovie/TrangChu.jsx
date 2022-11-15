import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useRoute from "../hooks/useRoute";
import { Result } from "antd";
import moment from "moment/moment";
import { gettingDanhSachFilm } from "../redux/reducers/PhimReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { USER_LOGIN } from "../utils/constant";

import { getStringLocal } from "../utils/config";
let timeOut = null;
const allContentWidth = {
  width: "1000px",
};
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
  const LoginInfo = getStringLocal(USER_LOGIN);
  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  const [dataThongTinLichChieu, setDataThongTinLichChieu] = useState([]);
  let dispatch = useDispatch();
  const params = useSearchParams();
  const navigate = useNavigate();
  let timeout = null;
const apiBanner = useSelector((state)=> state.danhSachPhimOne.danhSachPhim)
  let isLogin = localStorage.getItem(USER_LOGIN);
  const [listPhim, setDSphim] = useState([]);
  const layLichChieuFilm = async (maFilm) => {
    try {
      await axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maFilm=${maFilm}maNhom=GP03`,
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      }).then((result) => {
        setLichChieu(result.data.content);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    timeOut = setTimeout(() => {
      dispatch(layDanhSachFilm);
      axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`,
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      }).then((result) => {
        setDataRap(result.data.content);
      });
    }, 1000);
  }, []);
  return <div>
    {isLogin?(
      <div className="carousel-main">
        {banner.filter()}
      </div>
    )}
  </div>;
}
