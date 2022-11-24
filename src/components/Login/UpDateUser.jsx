import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { callGetProfile } from "../../redux/reducers/userReducer";

export default function UpDateUser() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(callGetProfile(values));
    console.log(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div style={{ width: "600px" }} className="container mt-5">
      <h2 className="text-center mb-5">Cập nhật thông tin</h2>
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
            {
              type: "email",
              message: "Email không đúng định dạng !",
            },
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

        <button className="btn btn-primary mx-2">Sửa</button>
      </Form>
    </div>
  );
}
