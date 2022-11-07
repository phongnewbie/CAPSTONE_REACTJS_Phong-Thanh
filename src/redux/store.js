//redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

export const store = configureStore({
  reducer: {
    rootReducer,
  },
});

//redux
// import { combineReducers, createStore } from 'redux';
// import { DemoReducer } from './reducers/DemoReducer';

// const rootReducer = combineReducers({
//   DemoReducer
// })

// export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
