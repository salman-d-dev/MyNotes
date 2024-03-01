import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Alertcomp from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Footer from './components/Footer';
import NoteState from './context/notes/noteState';
import AuthState from './context/notes/authState';
import ResetPassword from './components/ResetPassword';
import Navbar from './components/navbar/Navbar';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    // WRAP EVERYTHING INTO NoteState context api to acess it from any component  BY IMPORTING useCONTEXT
    <NoteState>
        <AuthState>
      <Router>
        <Alertcomp alert={alert} />
          <Navbar/>
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />}>
            </Route>
            <Route exact path='/signin' element={<Login showAlert={showAlert} />}>
            </Route>
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />}>
            </Route>
            <Route exact path='/resetpassword' element={<ResetPassword/>}>
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
        </AuthState>
    </NoteState>
  );
}

export default App;
