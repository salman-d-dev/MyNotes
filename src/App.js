import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Alertcomp from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Footer from "./components/footer/Footer";
import NoteState from "./context/notes/noteState";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <Router>
      <NoteState>
        <Navbar />
        <div className="container">
          <Alertcomp alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/signin"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/resetpassword"
              element={<ResetPassword />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </NoteState>
    </Router>
  );
}

export default App;
