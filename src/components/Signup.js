import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import authContext from '../context/notes/authContext';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    OTP: '',
  });

  const navigateTo = useNavigate();
  const [signUpClicked, setSignUpClicked] = useState(false);
  const { signUpF, sendOTPf, verifyOTPf } = useContext(authContext);
  const passwordsMatch = credentials.password === credentials.cpassword;
  const [OTPsent, setOTPsent] = useState(false);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
  const [countdown, setCountDown] = useState(120);

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const sendotpjson = await sendOTPf(credentials.email);
      if (sendotpjson.success) {
        setSignUpClicked(true); // Always set to true when signup button is clicked
        props.showAlert(`OTP sent to ${credentials.email}`, 'success');
        setOTPsent(true);

        setResendButtonDisabled(true);

        const timer = setInterval(() => {
          setCountDown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
          setResendButtonDisabled(false);
          clearInterval(timer);
        }, 120000);
      } else {
        props.showAlert(sendotpjson.error || 'Error sending OTP', 'danger');
      }
    } catch (error) {
      props.showAlert(error.error || 'Error sending OTP', 'danger');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const { OTP, name, email, password } = credentials;
    try {
      await verifyOTPf(email, OTP);

      const json = await signUpF(name, email, password);
      if (json.success) {
        props.showAlert('User created successfully', 'success');
        navigateTo('/signin');
      } else {
        props.showAlert(json.error || 'Error creating user', 'danger');
      }
    } catch (error) {
      props.showAlert(error.error || 'Error creating user', 'danger');
    }
  };

  const resendOTP = async () => {
    setCountDown(120);

    try {
      const sendotpjson = await sendOTPf(credentials.email);
      if (sendotpjson.success) {
        props.showAlert(`OTP sent to ${credentials.email}`, 'success');
        setOTPsent(true);

        setResendButtonDisabled(true);

        const timer = setInterval(() => {
          setCountDown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
          setResendButtonDisabled(false);
          clearInterval(timer);
        }, 120000);
      } else {
        props.showAlert(sendotpjson.error || 'Error sending OTP', 'danger');
      }
    } catch (error) {
      props.showAlert(error.error || 'Error sending OTP', 'danger');
    }
  };

  const changeFormData = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signupScreen">
      <div className="my-5 mx-auto text-center">
        <h2 className='hlogin'>Create a free <span className='loginh21'>My</span><span className='loginh22'>Notes</span> account</h2>
      </div>
      <div className="mx-auto text-center">
        <Form onSubmit={handleSignUp}>
          <Form.Group className="mb-3">
            <Form.Label className="w-100 text-center">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              id="name"
              value={credentials.name}
              onChange={changeFormData}
              minLength={5}
              required
              className="w-50 mx-auto loginField"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="w-100 text-center">
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={changeFormData}
              required
              className="w-50 mx-auto loginField"
            />
            <Form.Text className="text-muted" style={{ color: "white" }}>
              We never share your details with any third party.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="w-100 text-center">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={changeFormData}
              minLength={8}
              required
              className="w-50 mx-auto loginField"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="w-100 text-center">
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              id="cpassword"
              value={credentials.cpassword}
              onChange={changeFormData}
              className="w-50 mx-auto loginField"
            />
          </Form.Group>
          {/* conditional overlay */}
          {passwordsMatch ? (
            <>
              {signUpClicked ? null : (
                <Button
                  type="submit"
                  disabled={credentials.password !== credentials.cpassword}
                  className="addNoteButton"
                >
                  Sign Up
                </Button>
              )}
            </>
          ) : (
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">
                  Passwords do not match!
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={credentials.password !== credentials.cpassword}
                  className="addNoteButton"
                >
                  Sign Up
                </Button>
              </span>
            </OverlayTrigger>
          )}
        </Form>
      </div>
      <div>
        {/* if signup clicked, show verify otp button, else not */}
        {OTPsent && signUpClicked ? (
          <Form onSubmit={handleVerifyOtp}>
            <Form.Group className="d-flex flex-column align-items-center mb-3">
              <Form.Label className="w-25 text-center">Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="OTP"
                name="OTP"
                id="cpassword"
                value={credentials.OTP}
                onChange={changeFormData}
                className="w-25 mx-auto"
              />
              <Form.Text className="text-muted">
                OTP sent to {credentials.email}
              </Form.Text>
            </Form.Group>
            <span className="d-flex flex-column align-items-center mb-5">
              <Button
                variant="primary"
                type="submit"
                disabled={credentials.password !== credentials.cpassword}
                className="addNoteButton"
              >
                Verify OTP
              </Button>
            </span>
          </Form>
        ) : null}
        {OTPsent ? (
          <>
            <div className="text-center my-3">
              <button
                disabled={resendButtonDisabled}
                onClick={resendOTP}
                className="addNoteButton"
              >
                Resend OTP
              </button>
            </div>
            {resendButtonDisabled ? (
              <div className="text-center mb-2">
                <p className="countdownText">
                  Didn't receive OTP? Can resend in <span>{countdown}</span>{" "}
                  {countdown > 1 ? "seconds" : "second"}.
                </p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="my-3">
        <p>
          Already have an account? <Link to="/signin">Login</Link> here.
        </p>
      </div>
    </div>
  );
};

export default Signup;
