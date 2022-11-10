import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

export default function ChiTietFilm() {
  const params = useParams();
  const navigate = useNavigate();
  const [chiTietFilm, setFilm] = useState({});
  const [dataLichFilm, setLichFilm] = useState({});
  const getApiFilmChiTiet = async () => {
    const getApiFilm = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?maPhim=${params.maPhim}`,
      headers: {
        Token:
          "eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ",
      },
    });
    console.log(getApiFilm);
    //dispatch(getApiFilmChiTiet(getApiFilm));
    setFilm(getApiFilmChiTiet.data.content);
  };
  useEffect(() => {
    getApiFilmChiTiet();
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <img
            src={ChiTietFilm.img}
            alt=""
            className="img-fluid justify-center"
          />
        </div>
        <div className="col-7">
          <h2>{chiTietFilm.tenPhim}</h2>
          <p>{chiTietFilm.danhGia}</p>
          <p>{chiTietFilm.moTa}</p>
        </div>
      </div>
    </div>
  );
}
