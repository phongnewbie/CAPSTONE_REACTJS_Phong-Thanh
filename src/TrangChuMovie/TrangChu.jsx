import React, { useEffect, useState, useMemo } from "react";
import { Carousel } from "antd";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useRoute from "../hooks/useRoute";
import { Result } from "antd";
import moment from "moment/moment";
import {
  callApiDanhSachPhim,
  layDanhSachFilm,
} from "../redux/reducers/PhimReducer";
import { callDanhSachBanner } from "../redux/reducers/bannerReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { USER_LOGIN } from "../utils/constant";
import { getStringLocal } from "../utils/config";
import InfiniteScroll from "react-infinite-scroll-component";
import ListBody from "antd/lib/transfer/ListBody";
import Button from "react-bootstrap/Button";
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
  let apiBanner = useSelector((state) => state.bannerReducer.dsBannerFilm);
  let getDLFilm = useSelector((state) => state.PhimReducer.danhSachPhim);
  let dispatch = useDispatch();
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
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      getApiBanner();
      getApiPhim();
    }, 1000);
  }, []);
  let isLogin = localStorage.getItem(USER_LOGIN);
  const [listPhim, setDSphim] = useState([]);
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const layLichChieuFilm = async (maFilm) => {
    const getFilm = await axios({
      method: "GET",
      url: `https:movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maFilm=${maFilm}maNhom=GP03`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    setDSphim(getFilm.data.content);
  };
  useEffect(() => {
    timeOut = setTimeout(() => {
      dispatch(callDanhSachBanner);
      dispatch(layLichChieuFilm);
      axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim`,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      }).then((result) => {
        setDataRap(result.data.content);
      });
    }, 1000);
  }, []);
  const renderBanner = () => {
    return apiBanner.map((item, index) => {
      return (
        <div key={index} className="col-sm-3 pt-4 w-100 h">
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
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
  <Carousel autoplay>{renderBanner()}</Carousel>;

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
