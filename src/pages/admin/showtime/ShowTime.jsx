import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Cascader,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getHeThongRap,
  getCumRap,
  getTaoLichChieu,
} from "../../../redux/reducers/RapChieuPhim";
import { getHeThongRapPhim } from "../../../redux/reducers/thongTinHeThongRap";
import { useFormik } from "formik";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

export default function ShowTime() {
  const params = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: async (values) => {
      console.log("value", values);
      try {
        const result = await getTaoLichChieu(values);
        alert(result.data.content);
        navigate("/admin/films");
      } catch (error) {
        console.log("error", error.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  useEffect(() => {
    async function fatchData() {
      let result = await getHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    }
    fatchData();
    // try {
    // } catch (error) {
    //   console.log("error", error.response?.data);
    // }
  }, []);

  const handleChangeHeThongRap = async (values) => {
    try {
      let result = await getCumRap(values);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };

  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeInput = (values) => {
    formik.setFieldValue("giaVe", values);
  };

  const converSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return {
        label: htr.tenHeThongRap,
        value: htr.maHeThongRap,
      };
    });
  };

  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 style={{ marginBottom: "100px" }} className="text-center">
        Tạo lịch chiếu - {params.tenPhim}
      </h3>
      <div className="row">
        <div className="col-4 text-center">
          <img width={200} height={300} src={film.hinhAnh} />
        </div>
        <div className="col-8 text-left">
          <Form.Item label="Hệ thống rạp">
            <Select
              options={converSelectHTR()}
              onChange={handleChangeHeThongRap}
              placeholder="Chọn hệ thống rạp"
            />
          </Form.Item>
          <Form.Item label="Cụm rạp">
            <Select
              options={state.cumRapChieu?.map((cumRap, index) => {
                return {
                  label: cumRap.tenCumRap,
                  value: cumRap.maCumRap,
                };
              })}
              onChange={handleChangeCumRap}
              placeholder="Chọn cụm rạp"
            />
          </Form.Item>
          <Form.Item label="Ngày chiếu - giờ chiếu">
            <DatePicker
              format="DD/MM/YYYY hh:mm:ss"
              showTime
              onChange={onChangeDate}
              onOk={onOk}
            />
          </Form.Item>
          <Form.Item label="Giá vé">
            <InputNumber min={75000} max={90000} onChange={onChangeInput} />
          </Form.Item>
          <Form.Item label="Tạo lịch chiếu">
            <Button type="primary" htmlType="submit">
              Tạo lịch chiếu
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
