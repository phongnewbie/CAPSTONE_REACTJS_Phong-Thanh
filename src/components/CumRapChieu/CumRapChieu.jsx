import React, { useState, useEffect, Fragment } from "react";
import { Radio, Space, Tabs } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getFilmDataList } from "../../redux/reducers/RapChieuPhim";
import { getCumRapPhim } from "../../redux/reducers/thongTinHeThongRap";
import "./cumRap.css";
import { history } from "../../utils/history";

export default function CumRapChieu() {
  let timeout = null;
  let dispatch = useDispatch();
  const apiFilm = useSelector((state) => state.rapChieuPhim.dataRap);
  const apiCumRap = useSelector((state) => state.thongTinHeThongRap.dataCumRap);

  const getDsFilm = async () => {
    try {
      dispatch(getFilmDataList());
    } catch (err) {
      console.log(err);
    }
  };

  const getCumRap = async () => {
    try {
      dispatch(getCumRapPhim());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    timeout = setTimeout(() => {
      getDsFilm();
      getCumRap();
    }, 1000);
  }, []);

  return (
    <div className="container mt-5 cumRap-layOut cumRap-ove">
      {" "}
      <Tabs
        tabPosition={"left"}
        items={apiCumRap.map((item, i) => {
          const id = String(i + 1);
          return {
            label: <img src={item.logo} width={50} />,
            key: id,
            children: (
              <Tabs
                tabPosition={"left"}
                items={item.lstCumRap?.map((cumRap, i) => {
                  const id = String(i + 1);
                  return {
                    label: (
                      <div className="cumRap-warp">
                        <h6>{cumRap.tenCumRap}</h6>
                        <p className="cumRap-address">{cumRap.diaChi}</p>
                      </div>
                    ),
                    key: id,
                    children: (
                      <div className="cumRap-ove">
                        {cumRap.danhSachPhim?.map((listPhim, index) => {
                          return (
                            <Fragment key={index}>
                              <div className="mb-3 row">
                                <div className="col-2">
                                  <img
                                    className="img-fluid"
                                    src={listPhim.hinhAnh}
                                    width={100}
                                    height={150}
                                  />
                                </div>
                                <div className="col-10 row">
                                  <div className="col-12">
                                    <h6>{listPhim.tenPhim}</h6>
                                  </div>
                                  <div className="col-12 row">
                                    {listPhim.lstLichChieuTheoPhim?.map(
                                      (lichChieu, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="col-4 mb-2"
                                          >
                                            <button
                                              className="cumRap-btn"
                                              onClick={() => {
                                                history.push(
                                                  `/checkout/${lichChieu.maLichChieu}`
                                                );
                                              }}
                                            >
                                              {moment(
                                                lichChieu.ngayChieuGioChieu
                                              ).format("DD/MM/YY - HH:MM A")}
                                            </button>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </Fragment>
                          );
                        })}
                      </div>
                    ),
                  };
                })}
              />
            ),
          };
        })}
      />
    </div>
  );
}
