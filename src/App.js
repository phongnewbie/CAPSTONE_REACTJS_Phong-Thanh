
import './App.css';
import TrangChu from './TrangChuMovie/TrangChu';
import Header from './Header/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from "./utils/history"
function App() {
  return (
    <div className="App">
      <TrangChu/>
    </div>
  );
}

export default App;
