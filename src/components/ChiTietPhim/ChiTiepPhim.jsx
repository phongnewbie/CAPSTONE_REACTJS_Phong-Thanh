import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./chiTietPhim.css";
import { Radio, Space, Tabs } from "antd";
import moment from "moment";

export default function ChiTiepPhim() {
  const params = useParams();
  const navigate = useNavigate();

  const [chiTietLichChieu, setChiTietLichChieu] = useState({});
  const getApiChiTiet = async () => {
    const apiChiTiet = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${params.id}`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    setChiTietLichChieu(apiChiTiet.data.content);
    console.log(apiChiTiet.data.content);
  };

  useEffect(() => {
    getApiChiTiet();
  }, [params.id]);

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div style={{ marginTop: "150px" }} className="container">
      <div className="row">
        <div className="col-12 row">
          <div className="col-8 row">
            <div className="col-4">
              <img
                className="img-movie"
                width={200}
                height={320}
                src={chiTietLichChieu.hinhAnh}
              />
            </div>
            <div className="col-8">
              <h3>Tên Phim : {chiTietLichChieu.tenPhim} </h3>
              <p>
                Ngày chiếu :{" "}
                {moment(chiTietLichChieu.ngayKhoiChieu).format("DD/MM/YY")}
              </p>
              <p>Mô tả : {chiTietLichChieu.moTa} </p>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="col-12 mt-5 lichChieu-warp">
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: `Lịch chiếu`,
                key: "1",
                children: (
                  <div>
                    <Tabs
                      tabPosition={"left"}
                      items={chiTietLichChieu.heThongRapChieu?.map((htr, i) => {
                        const id = String(i + 1);
                        return {
                          label: (
                            <img
                              className="img-logo"
                              src={htr.logo}
                              width={50}
                            />
                          ),
                          key: id,
                          children: (
                            <div>
                              {htr.cumRapChieu?.map((cumRap, index) => {
                                return (
                                  <div className="mb-3" key={index}>
                                    <div className="row">
                                      <div className="col-12">
                                        <h4>Rạp Phim: {cumRap.tenCumRap}</h4>
                                        <p>Địa chỉ: {cumRap.diaChi}</p>
                                      </div>
                                      <div className="row w-full">
                                        {cumRap.lichChieuPhim?.map(
                                          (lichChieu, index) => {
                                            return (
                                              <button
                                                key={index}
                                                className="btn-lichChieu"
                                              >
                                                {moment(
                                                  lichChieu.ngayChieuGioChieu
                                                ).format("DD/MM/YY - HH:MM A")}
                                              </button>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ),
                        };
                      })}
                    />
                  </div>
                ),
              },
              {
                label: `Thông Tin`,
                key: "2",
                children: <div>{chiTietLichChieu.moTa}</div>,
              },
              {
                label: `Đánh giá`,
                key: "3",
                children: `Content of Tab Pane 3`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
