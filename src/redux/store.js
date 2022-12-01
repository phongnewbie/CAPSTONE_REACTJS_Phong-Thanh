//redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./reducers/bannerReducer";
import PhimReducer from "./reducers/PhimReducer";
import userReducer from "./reducers/userReducer";
import rapChieuPhim from "./reducers/RapChieuPhim";
import thongTinHeThongRap from "./reducers/thongTinHeThongRap";
import quanLyDatVeReducer from "./reducers/quanLyDatVeReducer";
import datVeReducer from "./reducers/datVeReducer";
export const store = configureStore({
  reducer: {
    bannerReducer,
    PhimReducer,
    userReducer,
    rapChieuPhim,
    thongTinHeThongRap,
    quanLyDatVeReducer,
    datVeReducer,
  },
});

//redux
// import { combineReducers, createStore } from 'redux';
// import { DemoReducer } from './reducers/DemoReducer';

// const rootReducer = combineReducers({
//   DemoReducer
// })

// export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
