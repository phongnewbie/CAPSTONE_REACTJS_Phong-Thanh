import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';
const initialState = {
  dataRap: [],
  
}
console.log(initialState.dataRap);

const rapChieuPhim = createSlice({
  name: "rapChieuPhim",
  initialState,
  reducers: {
      layDataFilm:(state,{type,payload})=>{
        {
        state.dataRap = payload;
        }
      }
      
  }
});
console.log(rapChieuPhim);

export const {layDataFilm} =  rapChieuPhim.actions
export default rapChieuPhim.reducer
export const getFilmDataList =()=> async(dispatch)=>{
   const getFilmData =  await axios({
    method:"GET",
    url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap`,
    headers:{
      TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I"
    },
  });
  console.log(getFilmData.data.content);
  dispatch(layDataFilm(getFilmData.data.content))
};

 


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";

// export default function RapChieuPhim() {
//   const [dataRap, setDataRap] = useState([]);
//   const [dataLichChieu, setLichChieu] = useState([]);

//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
//       headers: {
//         TokenCybersoft:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
//       },
//     }).then((result) => {
//       setDataRap(result.data.content);
//     });
//   }, []);
//   export const layLichChieu = (maHeThongRap) => {
//     axios({
//       method: "GET",
//       url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP03`,
//       headers: {
//         TokenCybersoft:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
//       },
//     }).then((result) => {
//       setLichChieu(result.data.content);
//     });
//   };
//   return (
//     <div className="text-left row">
//       <div className="col-3">
//         {dataRap?.map((item) => {
//           return (
//             <h3>
//               <img
//                 onClick={() => layLichChieu(item.maHeThongRap)}
//                 width={50}
//                 src={item.logo}
//               />
//             </h3>
//           );
//         })}
//       </div>

//       <div className="col-9">
//         {dataLichChieu?.map((item) => {
//           return item.lstCumRap.map((itemCumRap) => {
//             return (
//               <div className="row">
//                 <div className="col-6">
//                   <img width={50} src={itemCumRap.hinhAnh} />{" "}
//                   {itemCumRap.tenCumRap}
//                 </div>
//                 <div className="col-6">
//                   {itemCumRap.danhSachPhim.map((itemPhim) => {
//                     return (
//                       <h3>
//                         {" "}
//                         {itemPhim.tenPhim} <br />
//                         {itemPhim.lstLichChieuTheoPhim.map((itemLichChieu) => {
//                           let dateNow = new Date();
//                           let ngayChieu = new Date(
//                             itemLichChieu.ngayChieuGioChieu
//                           );

//                           return (
//                             <>
//                               {ngayChieu >= dateNow &&
//                                 moment(itemLichChieu.ngayChieuGioChieu).format(
//                                   "HH:mm"
//                                 ) + "-"}{" "}
//                             </>
//                           );
//                         })}
//                       </h3>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           });
//         })}
//       </div>
//     </div>
//   );
// }
