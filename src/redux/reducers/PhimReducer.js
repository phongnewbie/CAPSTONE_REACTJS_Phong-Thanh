import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';
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
export const gettingDanhSachFilm = async(dispatch) =>{
    dispatch(layDanhSachFilm)
}