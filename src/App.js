import "./App.css";
// import TrangChu from "./TrangChuMovie/TrangChu";
// import Header from "./Header/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./utils/history";
import "antd/dist/antd.css";

import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import InfoUser from "./components/SignUp/InfoUser";
import LayoutUser from "./templates/users/LayoutUser";
import TrangChu from "./pages/TrangChu";
import ChiTiepPhim from "./components/ChiTietPhim/ChiTiepPhim";
import CheckOutTemplate from "./templates/checkout/CheckOutTemplate";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Loading />
        <Routes>
          <Route path="/" element={<LayoutUser />}>
            <Route path="/" element={<TrangChu />} />
            <Route path="/chitietphim/:id" element={<ChiTiepPhim />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="info" element={<InfoUser />} />
          </Route>
          <Route path="/checkout/:id" element={<CheckOutTemplate />}></Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
