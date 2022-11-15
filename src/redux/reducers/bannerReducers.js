import { createSlice } from '@reduxjs/toolkit'
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';
const initialState = {
    dsbannerFilm : []
}

const bannerReducers = createSlice({
    name: "bannerReducers",
    initialState,
    reducers: {
        getdsbannerFilm:(state,{type,payload})=>{
            state.dsbannerFilm = payload;
        }
    }
});
export const{dsbannerFilm} = bannerReducers.actions
export default bannerReducers.reducer

export const callDanhSachBanner = async(dispatch)=>{
try{
    const recieveBannerApi = await axios({
        method: "GET",
        url : "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
        headers:{
            tokenCybersoft : "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner"
        }
    })
    dispatch(getdsbannerFilm(recieveBannerApi.data.content))
}catch(error){
    removeLocal(USER_LOGIN);
}
}