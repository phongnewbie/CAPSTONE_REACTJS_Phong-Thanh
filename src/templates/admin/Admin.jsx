import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, redirect, useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../../utils/constant";
import { history } from "../../utils/history";
import { useDispatch, useSelector } from "react-redux";
import { getThongTinNguoiDung } from "../../redux/reducers/quanLyNguoiDungReducer";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  //   <NavLink to="/films"></NavLink>,
  // getItem(<NavLink to="films">Quản lý phim</NavLink>, <PieChartOutlined />),
  getItem("Phim", "sub1", <UserOutlined />, [
    getItem(<NavLink to="films">Quản lý phim</NavLink>),
    getItem(<NavLink to="addnew">Thêm phim</NavLink>),
  ]),
  getItem("User", "sub2", <UserOutlined />, [
    getItem(<NavLink to="quanly">Quản lý người dùng</NavLink>),
    getItem(<NavLink to="adduser">Thêm người dùng</NavLink>),
  ]),
];

export default function Admin() {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const apiNguoiDung = useSelector(
    (state) => state.quanLyNguoiDungReducer.dataNguoiDung
  );

  const getApiPhim = async () => {
    try {
      dispatch(getThongTinNguoiDung());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiPhim();
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập trang này");
    navigate("/");
  }

  if (apiNguoiDung?.maLoaiNguoiDung === "KhachHang") {
    alert("Bạn không có quyền truy cập trang này");
    navigate("/");
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            // background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              //   background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
