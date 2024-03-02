import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authContext from '../context/notes/authContext';

const Login = (props) => {
  const NavigateTo = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const myauthcontext = useContext(authContext)
  const {signInF} = myauthcontext;
  //to show forgot password
  const [rightPassEntered, setRightPassEntered] = useState(true);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const json = await signInF(credentials.email,credentials.password);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      //get redir once auth token saved:
      NavigateTo('/');
      props.showAlert("Logged in successfully", "success")
    }
    else {
      props.showAlert("Invalid credentials", "danger")
      setRightPassEntered(false)
    }
  };

  const changeFormData = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='loginScreen'>
      <div className='my-3 text-center'>
        <h2 className='login my-5 hlogin' >Log into <span className='loginh21'>My</span><span className='loginh22'>Notes</span></h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' value={credentials.email} onChange={changeFormData} className="w-50  mx-auto loginField"/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' value={credentials.password} onChange={changeFormData} className="w-50 mx-auto loginField" />
          </Form.Group>
          <Button variant="primary" type="submit" className='mb-5 addNoteButton'>
            Log In
          </Button>
          {(!rightPassEntered)  ? (
      <div>
        <p>Forgot password? <Link to='/resetpassword'>Reset</Link> here.</p>
      </div>
      ) : ""}
        </Form>
      <div>
        <p>Don't have an account? <Link to='/signup'>Sign up</Link> here.</p>
      </div>
      </div>
      
    </div>
  )
}

export default Login;
