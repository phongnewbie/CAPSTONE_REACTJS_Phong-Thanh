import React, { useEffect, useState, Fragment } from "react";
import { Table } from "antd";
import { Input, Space, Button } from "antd";
import {
  AudioOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getDsNguoiDung,
  callApiXoaNguoiDung,
  getEditUser,
} from "../../../redux/reducers/quanLyNguoiDungReducer";
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

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function QuanLyUser() {
  const apiDsNguoiDung = useSelector(
    (state) => state.quanLyNguoiDungReducer.dsNguoiDung
  );
  let dispatch = useDispatch();

  const onSearch = (value) => {
    dispatch(getDsNguoiDung(value));
  };

  const getApiPhim = async () => {
    try {
      dispatch(getDsNguoiDung());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiPhim();
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: 200,
      // value: (text, object) => {
      //   return <span>{text}</span>;
      // },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
      render: (text, user) => {
        return (
          <Fragment>
            {user.email.length > 30
              ? user.email.substr(0, 30) + "..."
              : user.email}
          </Fragment>
        );
      },
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      onFilter: (value, record) => record.maLoaiNguoiDung.includes(value),
      sorter: (a, b) => a.maLoaiNguoiDung.length - b.maLoaiNguoiDung.length,
      sortDirections: ["descend"],
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              style={{ color: "blue" }}
              className="mr-2"
              to={`edituser/${user.taiKhoan}`}
              onClick={() => {
                dispatch(getEditUser());
              }}
            >
              <EditOutlined />{" "}
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("bạn muốn xóa phim " + user.taiKhoan)) {
                  dispatch(callApiXoaNguoiDung(user.taiKhoan));
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

  const data = apiDsNguoiDung;

  return (
    <div className="container">
      <h3 className="mb-4">Quản lý người dùng</h3>
      <Button
        onClick={() => {
          history.push("/admin/adduser");
        }}
        className="mb-3"
      >
        Thêm người dùng
      </Button>
      <Search
        className="mb-3"
        placeholder="tìm kiếm người dùng"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
