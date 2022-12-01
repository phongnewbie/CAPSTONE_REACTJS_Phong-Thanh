import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachGheDangDat: [],
};

const quanLyDatVeReducer = createSlice({
  name: "quanLyDatVeReducer",
  initialState,
  reducers: {
    saveGhe: (state, { type, payload }) => {
      let dsGheDangDatUpdate = [...state.danhSachGheDangDat];

      let index = dsGheDangDatUpdate.findIndex(
        (gheDangDat) => gheDangDat.stt == payload.stt
      );

      if (index != -1) {
        dsGheDangDatUpdate.splice(index, 1);
      } else {
        dsGheDangDatUpdate.push(payload);
      }

      return { ...state, danhSachGheDangDat: dsGheDangDatUpdate };
    },
  },
});

export const { saveGhe } = quanLyDatVeReducer.actions;

export default quanLyDatVeReducer.reducer;

// const stateDefault = {
//   danhSachGheDangDat: [],
// };

// export const quanLyDatVeReducer = (state = stateDefault, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case "DAT_GHE": {
//       let dsGheDangDatUpdate = [...state.danhSachGheDangDat];

//       let index = dsGheDangDatUpdate.findIndex(
//         (gheDangDat) => gheDangDat.stt == payload.stt
//       );

//       if (index != -1) {
//         dsGheDangDatUpdate.splice(index, 1);
//       } else {
//         dsGheDangDatUpdate.push(payload);
//       }

//       return { ...state, danhSachGheDangDat: dsGheDangDatUpdate };
//     }

//     default:
//       return { ...state };
//   }
// };
