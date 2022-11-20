import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
<<<<<<< HEAD
=======

>>>>>>> c8472ea737a7e47415b3d004444ec21a55d469fe
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
