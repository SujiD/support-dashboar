import {BrowserRouter  as Router, Route, Routes} from "react-router-dom";
import SignIn from './pages/SignIn';
import { HomePage } from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} exact/>
          <Route path="/home" element={<HomePage />} exact/>
        </Routes>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;
