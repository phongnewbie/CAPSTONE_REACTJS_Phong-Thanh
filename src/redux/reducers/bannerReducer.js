import { createSlice } from '@reduxjs/toolkit'
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';
import axios from 'axios';
const initialState = {
    dsBannerFilm : []
    
}
console.log(initialState);
const bannerReducer = createSlice({
    name: "bannerReducer",
    initialState,
    reducers: {
        getDsBannerFilm:(state,{type,payload})=>{{
            state.dsBannerFilm = payload;
        }
        }
    }
});

export const{getDsBannerFilm} = bannerReducer.actions
export default bannerReducer.reducer
export const callDanhSachBanner = async(dispatch)=>{
try{
    const recieveBannerApi = await axios({
        method: "GET",
        url : "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
    })
    dispatch(getDsBannerFilm(recieveBannerApi.data.content))
}catch(error){
    removeLocal(USER_LOGIN);
};
}
