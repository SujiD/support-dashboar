import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useSpring, animated } from "react-spring";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ErrorPage from "./components/error/ErrorPage";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { ErrorProvider } from "./contexts/ErrorContext";
import HandleErrors from "./common/HandleError";
import Authenticate from "./auth/Authenticate";
import Authentication from "./auth/Authentication";
import LandingPage from "../src/landing-page/LandingPage";
import * as ROUTES from "../src/common/routes";
import ReportView from "./components/view-report/ReportView";

function App() {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Provider store={store}>
      <animated.div style={styles}>
        <ErrorProvider>
          <Router>
            <HandleErrors />
            <Routes>
              <Route
                path={ROUTES.GET_STARTED}
                element={<LandingPage />}
                exact
              />
              <Route
                path={ROUTES.INITIALIZE}
                element={<Authenticate />}
                exact
              />
              <Route
                path={ROUTES.AUTHENTICATION}
                element={<Authentication />}
                exact
              />
              <Route path={ROUTES.HOME} element={<HomePage />} exact />
              <Route
                path={`${ROUTES.VIEW_REPORT}/:viewID`}
                element={<ReportView />}
                exact
              />
              <Route path={ROUTES.ERROR} element={<ErrorPage />} exact />
            </Routes>
          </Router>
          <ToastContainer />
        </ErrorProvider>
      </animated.div>
    </Provider>
  );
}

export default App;
