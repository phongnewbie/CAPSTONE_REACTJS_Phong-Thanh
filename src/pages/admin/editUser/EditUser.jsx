import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  callSignUp,
  getInfoUser,
  getEditUser,
} from "../../../redux/reducers/quanLyNguoiDungReducer";
import { useParams } from "react-router-dom";

export default function EditUser(props) {
  const dispatch = useDispatch();
  const params = useParams();

  const apiThongTinNguoiDung = useSelector(
    (state) => state.quanLyNguoiDungReducer.thongTinNguoiDung
  );
  console.log("info", apiThongTinNguoiDung);

  const getApiInfoUser = async () => {
    try {
      dispatch(getInfoUser(params.id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiInfoUser();
  }, [params.id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: apiThongTinNguoiDung.taiKhoan,
      matKhau: apiThongTinNguoiDung.matKhau,
      email: apiThongTinNguoiDung.email,
      soDT: apiThongTinNguoiDung.soDT,
      maLoaiNguoiDung: apiThongTinNguoiDung.maLoaiNguoiDung,
      hoTen: apiThongTinNguoiDung.hoTen,
      maNhom: apiThongTinNguoiDung.maNhom,
    },
    onSubmit: (values) => {
      console.log("value", values);
      values.loaiNguoiDung = {
        maLoaiNguoiDung: apiThongTinNguoiDung.maLoaiNguoiDung,
        tenLoai: apiThongTinNguoiDung.loaiNguoiDung.tenLoai,
      };
      dispatch(getEditUser(values));
    },
  });

  const handleChangOption = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const { Option } = Select;

  return (
    <div style={{ width: "600px" }} className="container">
      <h2 className="text-center mb-5">Cập nhật người dùng</h2>

      <Form
        {...layout}
        name="register"
        //  onFinish={onFinish}

        onSubmitCapture={formik.handleSubmit}
      >
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
            disabled={true}
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
          <Input
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>

        <Form.Item
          label="E-mail"
          rules={[
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

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
