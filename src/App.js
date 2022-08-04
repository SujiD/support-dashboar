import {BrowserRouter  as Router, Route, Routes} from "react-router-dom";
import {Login} from './pages/Login';
import { HomePage } from "./pages/HomePage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact/>
        <Route path="/home" element={<HomePage />} exact/>
      </Routes>
    </Router>
  );
}

export default App;
