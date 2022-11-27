import { createSlice } from '@reduxjs/toolkit'
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';
import axios from 'axios';
const initialState = {
    dsFilmChieu: [],
}

const danhSachPhim = createSlice({
    name: "danhSachPhim",
    initialState,
    reducers: {
        getDsFilmChieu:(state,{ type,payload})=>{
            state.dsFilmChieu = payload
        }
    }
});
export const getDsFilmChieu = danhSachPhim.reducer
export default danhSachPhim.reducer
export const callDsFillChieu = () => async (dispatch) =>{
    const receiveDsFilm = await axios({
        method: "GET",
        url : `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03`,
        headers: {
            TokenCybersoft : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I"
        }
    })
    console.log(receiveDsFilm.data.content);
    dispatch(receiveDsFilm.data.content);
}
export const callDataLich = (maHeThongRap) => async(dispatch) =>{
    const receiveDataDsFilm = await axios({
        method: "GET",
        url : `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP03`,
        headers: {
            TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I"
        }
    })
}
