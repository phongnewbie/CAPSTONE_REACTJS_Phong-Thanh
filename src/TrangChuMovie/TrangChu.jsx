import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useRoute from "../hooks/useRoute";
import { Result } from "antd";
import moment from "moment/moment";
import { callApiDanhSachPhim } from "../redux/reducers/PhimReducer";
import { callDanhSachBanner } from "../redux/reducers/bannerReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { USER_LOGIN } from "../utils/constant";
import { getStringLocal } from "../utils/config";
let timeOut = null;
const allContentWidth = {
  width: "1000px",
};

export default function TrangChu() {
  const LoginInfo = getStringLocal(USER_LOGIN);
  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);

  const navigate = useNavigate();
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

  let isLogin = localStorage.getItem(USER_LOGIN);
  const [listPhim, setDSphim] = useState([]);
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const layLichChieuFilm = async (maFilm) => {
    try {
      await axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maFilm=${maFilm}maNhom=GP03`,
        headers: {
          TokenCybersoft:
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
      dispatch(callApiDanhSachPhim);
      dispatch(callDanhSachBanner);
      axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap`,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      }).then((result) => {
        setDataRap(result.data.content);
      });
    }, 1000);
  }, []);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

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
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img className="w-100 opacity-0" />
          </div>
        </div>
      );
    });
  };

  return <Carousel autoplay>{renderBanner()}</Carousel>;

  // return (
  //   <div className="container">
  //     <h1>CGV</h1>

  //     <div className="row">
  //       {apiBanner.map((item, index) => {
  //         return (
  //           <div className="col-sm-3 pt-4">
  //             <div className="card">
  //               <img src={item.hinhAnh} alt="" />
  //               <div className="card-body">
  //                 {/* <h5 className="card-title">{item.name}</h5> */}
  //                 {/* <p className="card-text">{item.shortDescription}</p> */}
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}
