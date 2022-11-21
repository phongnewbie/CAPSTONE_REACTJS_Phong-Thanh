import "./App.css";
import TrangChu from "./TrangChuMovie/TrangChu";
import Header from "./Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./utils/history";
import MainPage from "./MainLayOut/MainPage";
import "antd/dist/antd.css";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import InfoUser from "./components/SignUp/InfoUser";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/trangchu" element={<TrangChu />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="info" element={<InfoUser />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
