import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signIn } from '../api/auth';
import { useNoteContext } from '../context/notes/noteContext';
import { throttle } from '../utils/throttle';
import { ImSpinner9 } from 'react-icons/im';
import usePostData from '../hooks/usePostData';

const Login = (props) => {


  const {navigateTo} = useNoteContext()

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  //to show forgot password
  const [rightPassEntered, setRightPassEntered] = useState(true);
  const {loading, data,  sendData} = usePostData();
  
  //delay function call by 2s
  const throttledSignIn = throttle(signIn, 2000)
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await sendData(throttledSignIn, credentials)
      
    } catch (error) {
      props.showAlert(error.message || "Something went wrong. Please try again","danger")
      setRightPassEntered(false)
    }
  };

  if(data?.authtoken){
    localStorage.setItem("token", data.authtoken);
    props.showAlert("Logged in succesfully","success")
    navigateTo("/")
}
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
          <Button variant="primary" disabled={loading} type="submit" className='mb-5 addNoteButton'>
          {loading? <ImSpinner9 className='searchIcon'/> : "Login"}
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
