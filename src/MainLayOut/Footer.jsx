import React from "react";
import { Space } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
export default function Footer() {
  return (
    <div className="container" style={{ backgroundColor: "gray" }}>
      <div className="footer_Film">
        <div className="content_Film d-flex">
          <div className="cinema_vietnam">
            <h3>CGV Việt Nam</h3>
            <ul>
              <li className="list-group-item list-group-item-dark ">
                <a href="" className="text-decoration-none">
                  Giới Thiệu
                </a>
              </li>
              <li className="list-group-item list-group-item-dark ">
                <a
                  href=""
                  className="text-decoration-none"
                  className="text-decoration-none"
                >
                  Tiện Ích Online
                </a>
              </li>
              <li className="list-group-item list-group-item-dark ">
                <a href="" className="text-decoration-none">
                  Thẻ Quà Tặng
                </a>
              </li>
              <li className="list-group-item list-group-item-dark ">
                <a href="" className="text-decoration-none">
                  Tuyển Dụng
                </a>
              </li>
              <li className="list-group-item list-group-item-dark ">
                <a href="" className="text-decoration-none">
                  Liên Hệ Quảng Cáo
                </a>
              </li>
            </ul>
          </div>
          <div className="cgv-policy">
            <h3>Điều khoản sử dụng</h3>
            <ul>
              <li className="list-group-item list-group-item-dark">
                <a href="" className="text-decoration-none">
                  Điều Khoản Chung
                </a>
              </li>
              <li className="list-group-item list-group-item-dark">
                <a href="" className="text-decoration-none">
                  Điều Khoản Giao Dịch
                </a>
              </li>
              <li className="list-group-item list-group-item-dark">
                <a href="" className="text-decoration-none">
                  Chính Sách Thanh Toán
                </a>
              </li>
              <li className="list-group-item list-group-item-dark">
                <a href="" className="text-decoration-none">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li className="list-group-item list-group-item-dark">
                <a href="" className="text-decoration-none">
                  Câu Hỏi Thường Gặp
                </a>
              </li>
            </ul>
          </div>
          <div className="cgv-follow-us">
            <h3>Kết nối với chúng tôi</h3>
            <div>
              <ul
                className="d-flex ms-2 list-item  pt-4 ms-2"
                style={{ listStyleType: "none" }}
              >
                <li>
                  <Space>
                    <FacebookOutlined />
                  </Space>
                </li>
                <li>
                  <Space>
                    <YoutubeOutlined />
                  </Space>
                </li>
                <li>
                  <Space>
                    <TwitterOutlined />
                  </Space>
                </li>
                <li>
                  <Space>
                    <InstagramOutlined />
                  </Space>
                </li>
              </ul>
            </div>
          </div>
          <div className="customer-cgv">
            <h3>Chăm sóc khách hàng</h3>
            <p>
              Hotline: 1900 0000 Giờ làm việc: 8:00 - 22:00
              <br /> (Tất cả các ngày bao gồm cả Lễ Tết)
              <br />
              Email hỗ trợ:{" "}
              <a href="" className="text-decoration-none">
                hoidap@.vn
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-image"></div>
    </div>
  );
}
