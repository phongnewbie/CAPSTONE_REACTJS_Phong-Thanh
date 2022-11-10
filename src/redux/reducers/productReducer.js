import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    danhSachFilm: []
}

const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers: {
        addFilm: (state, { type, payload }) => {
            // let danhSachGiay = [...state.danhSachGiay]
            state.danhSachGiay = payload;
            //return {...state, danhSachGiay}
        }
    }
});

export const { addFilm } = productReducer.actions

export default productReducer.reducer

//closure function
 export const callApiFilm =  async (dispatch) => {
     const apiFilm = await axios({
         method: "GET",
         url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`
     })
     console.log(apiFilm);

     dispatch(addFilm(apiFilm.data.content));
 }