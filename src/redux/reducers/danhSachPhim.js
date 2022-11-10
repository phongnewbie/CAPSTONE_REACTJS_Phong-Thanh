import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    danhSachPhim:[],
}

const danhSachPhim = createSlice({
    name: sliceName,
    initialState,
    reducers: {
    
    }
});

export const {

} = danhSachPhim.actions
export default danhSachPhim.reducer