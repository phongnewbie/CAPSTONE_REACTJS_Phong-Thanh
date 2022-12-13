import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { callSignUp } from "../../../redux/reducers/quanLyNguoiDungReducer";

export default function AddUser(props) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(callSignUp(values));
    console.log(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const { Option } = Select;

  return (
    <div style={{ width: "600px" }} className="container">
      <h2 className="text-center mb-5">Thêm người dùng</h2>

      <Form {...layout} name="register" onFinish={onFinish}>
        <Form.Item
          name="taiKhoan"
          label="Tài Khoản"
          rules={[
            {
              required: true,
              message: "Hãy nhập tài khoản !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="matKhau"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="matKhau"
          label="Nhập lại mật khẩu"
          dependencies={["matKhau"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Mật khẩu không khớp!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            // {
            //   type: "email",
            //   message: "Email không đúng định dạng !",
            // },
            {
              required: true,
              message: "Hãy nhập Email !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="soDt"
          label="Điện thoại"
          rules={[
            {
              required: true,
              message: "Hãy nhập số điện thoại",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="maNhom"
          label="Mã nhóm"
          rules={[
            {
              required: true,
              message: "Hãy nhập mã nhóm",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="maLoaiNguoiDung"
          label="Loại người dùng"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Hãy chọn loại người dùng">
            <Option value="KhachHang">khác hàng</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="hoTen"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Hãy nhập họ tên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
