import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  callApiCapNhatPhim,
  thongTinPhim,
} from "../../../redux/reducers/PhimReducer";
import { callApiLayThongTinPhim } from "../../../redux/reducers/PhimReducer";
import { useParams, useNavigate } from "react-router-dom";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { data } from "autoprefixer";

export default function EditFilm() {
  const [imgSrc, setImgSrc] = useState("");
  const params = useParams();
  let dispatch = useDispatch();
  const apiThongTinPhim = useSelector(
    (state) => state.PhimReducer.thongTinPhim
  );
  console.log(apiThongTinPhim);

  const getApiPhim = async () => {
    try {
      dispatch(callApiLayThongTinPhim(params.id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiPhim();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      biDanh: apiThongTinPhim.biDanh,
      maPhim: apiThongTinPhim.maPhim,
      tenPhim: apiThongTinPhim.tenPhim,
      trailer: apiThongTinPhim.trailer,
      moTa: apiThongTinPhim.moTa,
      ngayKhoiChieu: apiThongTinPhim.ngayKhoiChieu,
      dangChieu: apiThongTinPhim.dangChieu,
      sapChieu: apiThongTinPhim.sapChieu,
      hot: apiThongTinPhim.hot,
      danhGia: apiThongTinPhim.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log("value", values);
      values.maNhom = "GP01";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(callApiCapNhatPhim(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangInput = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangFile = async (e) => {
    let file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/png") {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div className="container">
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 className="text-center">Cập nhật phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            disabled={false}
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            onChange={handleChangeDatePicker}
            format={"DD/MM/YYYY"}
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.Hot}
          />
        </Form.Item>

        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangInput("danhGia")}
            value={formik.values.danhGia}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangFile}
            accept="image/png, image/jpeg"
          />
          <br />
          <img
            className="img-fluid"
            style={{ width: 100, height: 150 }}
            src={imgSrc === "" ? apiThongTinPhim.hinhAnh : imgSrc}
            alt="..."
          />
        </Form.Item>
        <Form.Item label="Button">
          <button className="btn btn-success" type="submit">
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
