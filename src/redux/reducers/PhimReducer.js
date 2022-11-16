import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';
import { http } from '../../utils/baseUrl';
const initialState = {
    danhSachPhim:[],
}

const danhSachPhimOne = createSlice({
    name: "danhSachPhimOne",
    initialState,
    reducers: {
        layDanhSachFilm:(state,{type,payload})=>{
        state.danhSachPhim = payload
        }
    }
});
export const {layDanhSachFilm} = danhSachPhimOne.actions
export default danhSachPhimOne.reducer
export const callApiDanhSachPhim = async(dispatch) =>{
    try{
        const getApiFilm = await http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP03");
        dispatch(layDanhSachFilm(getApiFilm.data.content));

    }catch(err){
        console.log(err);
    }
}