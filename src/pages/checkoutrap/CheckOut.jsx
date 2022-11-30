import React, { useState, useEffect, Fragment, sortBy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetProfile } from "../../redux/reducers/userReducer";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import "./checkout.css";

export default function CheckOut() {
  let dispatch = useDispatch();
  let infoUser = useSelector((state) => state.userReducer.infoUser);

  let userLocalStorage = getStringLocal(USER_LOGIN);

  const apiGheDaDat = useSelector(
    (state) => state.quanLyDatVeReducer.danhSachGheDangDat
  );

  const params = useParams();
  const navigate = useNavigate();

  const [datVe, setDatVe] = useState({});
  const getApiChiTiet = async () => {
    const apiChiTiet = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.id}`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    setDatVe(apiChiTiet.data.content);
    console.log("đặt vé", apiChiTiet.data.content);
  };

  const { thongTinPhim, danhSachGhe } = datVe;

  useEffect(() => {
    dispatch(callGetProfile);
    getApiChiTiet();
  }, [params.id]);

  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let cssGheDangDat = "";
      let indexGheDangDat = apiGheDaDat.findIndex(
        (gheDangDat) => gheDangDat.stt == ghe.stt
      );
      if (indexGheDangDat != -1) {
        cssGheDangDat = "gheDangChon";
      }

      let classGheVip = ghe.loaiGhe == "Vip" ? "gheVip" : "";
      let classGhaDaDat = ghe.daDat == true ? "seats-taken" : "";
      return (
        <Fragment key={index}>
          <button
            onClick={() =>
              dispatch({
                type: "DAT_GHE",
                payload: ghe,
              })
            }
            disabled={ghe.daDat}
            className={`seats ${classGheVip} ${classGhaDaDat} ${cssGheDangDat} `}
          >
            {ghe.stt}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f9fbfd",
        height: "100vh",
      }}
    >
      <div className="row">
        <div className="col-8 text-center">
          <div className="screen mb-4">Màn Hình</div>
          <div>{renderSeats()}</div>
          <div className="row mt-4 infoGhe">
            <div className=" m-auto col-6 row align-items-center ml-3">
              <button
                style={{ marginLeft: "100px" }}
                className="seats seats-taken"
              ></button>
              <p style={{ marginBottom: "0", fontWeight: "500" }}>
                Ghế đã được mua
              </p>
            </div>
            <div className=" m-auto col-6 row align-items-center ml-3">
              <button
                style={{ marginLeft: "100px" }}
                className="seats gheDangChon"
              ></button>
              <p style={{ marginBottom: "0", fontWeight: "500" }}>
                Ghế bạn đang chọn
              </p>
            </div>
            <div className=" m-auto col-6 row align-items-center ml-3">
              <button
                style={{ marginLeft: "100px" }}
                className="seats"
              ></button>
              <p style={{ marginBottom: "0", fontWeight: "500" }}>
                Ghế chưa được mua
              </p>
            </div>
            <div className=" m-auto col-6 row align-items-center ml-3">
              <button
                style={{ marginLeft: "100px" }}
                className="seats gheVip "
              ></button>
              <p style={{ marginBottom: "0", fontWeight: "500" }}>
                Ghế Vip chưa được mua
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card-info mt-3">
            <h3>{thongTinPhim?.tenCumRap}</h3>
            <p>
              Phim: <strong>{thongTinPhim?.tenPhim}</strong>
            </p>
            <p>
              Địa điểm: <strong>{thongTinPhim?.diaChi}</strong>
            </p>
            <p>
              Ngày chiếu:<strong> {thongTinPhim?.ngayChieu}</strong> -{" "}
              <strong>{thongTinPhim?.gioChieu}</strong> -
              <strong>{thongTinPhim?.tenRap}</strong>
            </p>
            <div>
              <span>
                Ghế :
                <strong>
                  {_.sortBy(apiGheDaDat, ["stt"]).map((gheDD, index) => {
                    return <span key={index}> - {gheDD.stt}</span>;
                  })}
                </strong>
              </span>
            </div>
          </div>

          <div className="card-info">
            <div>
              E-Mail:
              <strong> {infoUser.email}</strong>
            </div>
            <div>
              Phone:
              <strong> {infoUser.soDT}</strong>
            </div>
          </div>
          <div className="text-center card-info">
            <h3 className="text-muted">Tổng đơn hàng</h3>
            <h3>
              {apiGheDaDat
                .reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}
            </h3>
          </div>
          <div>
            <button
              style={{ width: "100%", fontSize: "20px" }}
              className=" btn btn-success"
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
