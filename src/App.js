import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import Report from "./components/Report/Report";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
              {/* <Route
                path="/"
                element={<Navigate to="/file-upload" replace />}
              /> */}
              <Route path="/file-upload" element={<FileUpload />} />
              <Route path="/report" element={<Report />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
