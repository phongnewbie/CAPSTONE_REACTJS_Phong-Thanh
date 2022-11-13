import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    danhSachPhim:[],
}

const danhSachPhim = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        Token:``
    }
});

export const {

} = danhSachPhim.actions
export default danhSachPhim.reducer