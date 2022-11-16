
import './App.css';
import TrangChu from './TrangChuMovie/TrangChu';
import Header from './Header/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {history} from "./utils/history"
import MainPage from './MainLayOut/MainPage'
import bannerReducer from './redux/reducers/bannerReducer';
function App() {
  return (
    <div className="App">
       <HistoryRouter history={history} >
      <Routes>
        <Route path='/' element={<MainPage/>}>
          <Route path='/trangchu' element={<TrangChu/>}/>
          </Route>
      </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
