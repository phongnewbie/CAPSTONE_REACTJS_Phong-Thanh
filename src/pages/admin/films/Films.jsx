import React, { useEffect, useState, Fragment } from "react";
import { Table } from "antd";
import { Input, Space, Button } from "antd";
import { AudioOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  callApiDanhSachPhim,
  callApiXoaPhim,
} from "../../../redux/reducers/PhimReducer.js";
import { history } from "../../../utils/history.js";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const onSearch = (value) => console.log(value);

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Films() {
  const apiDsPhim = useSelector((state) => state.PhimReducer.danhSachPhim);
  let dispatch = useDispatch();

  const getApiPhim = async () => {
    try {
      dispatch(callApiDanhSachPhim());
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("hihi", apiDsPhim);

  useEffect(() => {
    getApiPhim();
  }, []);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      width: 150,
      // value: (text, object) => {
      //   return <span>{text}</span>;
      // },

      onFilter: (value, record) => record.maPhim.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      // value: "descend",
      // sorter: (a, b) => a.hinhAnh - b.hinhAnh,
      render: (text, films, index) => {
        return (
          <Fragment>
            <img
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50`;
              }}
              width={50}
              src={films.hinhAnh}
              alt={films.tenPhim}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, fimls) => {
        return (
          <Fragment>
            {fimls.moTa.length > 50
              ? fimls.moTa.substr(0, 50) + "..."
              : fimls.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              style={{ color: "blue" }}
              className="mr-2"
              to={`editfilm/${film.maPhim}`}
            >
              <EditOutlined />{" "}
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("bạn muốn xóa phim " + film.tenPhim)) {
                  dispatch(callApiXoaPhim(film.maPhim));
                }
              }}
              key={2}
              className=""
              to="/"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
    },
  ];

  const data = apiDsPhim;

  return (
    <div className="container">
      <h3 className="mb-4">Quản lý phim</h3>
      <Button
        onClick={() => {
          history.push("/admin/addnew");
        }}
        className="mb-3"
      >
        Thêm phim
      </Button>
      <Search
        className="mb-3"
        placeholder="input search text"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
}
