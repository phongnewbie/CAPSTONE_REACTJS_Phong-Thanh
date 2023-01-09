import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { callGetProfile } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { callUpdateUser } from "../../redux/reducers/userReducer";

export default function UpDateUser() {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.userReducer.infoUser);
  console.log(infoUser);

  const onFinish = (values) => {
    dispatch(callGetProfile(values));
    console.log(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: infoUser.taiKhoan,
      matKhau: infoUser.matKhau,
      email: infoUser.email,
      soDT: infoUser.soDT,
      maLoaiNguoiDung: infoUser.maLoaiNguoiDung,
      hoTen: infoUser.hoTen,
      maNhom: infoUser.maNhom,
    },
    onSubmit: (values) => {
      console.log("value", values);

      dispatch(callUpdateUser(values));
    },
  });

  const handleChangOption = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const { Option } = Select;

  return (
    <div style={{ width: "600px" }} className="container mt-5">
      <h2 className="text-center mb-5">Cập nhật thông tin</h2>
      <Form {...layout} name="register" onSubmitCapture={formik.handleSubmit}>
        <Form.Item
          label="Tài Khoản"
          rules={[
            {
              required: true,
              message: "Hãy nhập tài khoản !",
            },
          ]}
        >
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>

        <Form.Item
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
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item
          label="Điện thoại"
          rules={[
            {
              required: true,
              message: "Hãy nhập số điện thoại",
            },
          ]}
        >
          <Input
            name="soDT"
            onChange={formik.handleChange}
            value={formik.values.soDT}
          />
        </Form.Item>

        <Form.Item
          label="Mã nhóm"
          rules={[
            {
              required: true,
              message: "Hãy nhập mã nhóm",
            },
          ]}
        >
          <Input
            name="maNhom"
            onChange={formik.handleChange}
            value={formik.values.maNhom}
          />
        </Form.Item>

        <Form.Item
          label="Loại người dùng"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select
            name="maLoaiNguoiDung"
            onChange={handleChangOption("maLoaiNguoiDung")}
            value={formik.values.maLoaiNguoiDung}
            placeholder="Hãy chọn loại người dùng"
          >
            <Option value="KhachHang">khác hàng</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Hãy nhập họ tên",
            },
          ]}
        >
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}
