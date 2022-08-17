import {BrowserRouter  as Router, Route, Routes} from "react-router-dom";
import SignIn from './pages/SignIn';
import { HomePage } from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import {useSpring, animated} from "react-spring";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const styles = useSpring({
    from:{ opacity: 0},
    to:{ opacity: 1}
  })
  return (
    <animated.div style={styles}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} exact/>
          <Route path="/home" element={<HomePage />} exact/>
        </Routes>
      </Router>
      <ToastContainer />
    </animated.div>

  );
}

export default App;
