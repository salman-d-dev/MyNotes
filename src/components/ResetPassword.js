import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { resendOTP, resetPassword, verifyOTP } from "../api/auth";
import { throttle } from "../utils/throttle";

const ResetPassword = () => {

  //throttle the api calls by X sec
  const throttledResendOTP = throttle(resendOTP, 5000);
  const throttledResetPass = throttle(resetPassword, 2000);
  const throttledVerifyOTP = throttle(verifyOTP, 2000);

  const [formData, setFormData] = useState({
    email: "",
    OTP: "",
    password: "",
    repeatpassword:""
  });

  //enable data entry
  const changeFormData = (field) => {
    setFormData({ ...formData, [field.target.name]: field.target.value });
  };

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified,setOtpVerified] = useState(false)
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
//for countdown
const [countdown, setCountDown] = useState(120);
 
  //email submission

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const jsonresult = await throttledResendOTP(formData.email);
    if (jsonresult.success) {
      setOtpSent(true);
      setResendButtonDisabled(true);
      //countdown
      //start the timer:
      const timer = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1);
      }, 1000);

      //enable the button after x time
      setTimeout(() => {
        setResendButtonDisabled(false);
        //once enabled, remove timer
        clearInterval(timer);
        setCountDown(120)
      }, 120000);
    }
  };
  const handleVerifyOTP = async(e) => {
    e.preventDefault();
    const jsonresult = await throttledVerifyOTP(formData.email,formData.OTP);
    if (jsonresult.success){
      setOtpVerified(true);
    }
  };

  const navigateTo = useNavigate();
  
  const handleNewPassSubmit = async(e) =>{
    e.preventDefault();
    const jsonresult = await throttledResetPass(formData.email,formData.password);
    if (jsonresult.success){
      navigateTo('/signin')
    }
  }

  return (
    <>
      <div className="my-3 text-center resetPassContainer">
        <h2 className="login my-3 d-block" id="hlogin">
          <span className="loginh21">My</span>
          <span className="loginh22">Notes</span>
        </h2>
        <h2>Reset your password</h2>

        <div className="resetOTPBox">
          {otpSent ? (
            <>
              <div>
                {otpVerified? (<>
                  <div>
                  <Form onSubmit={handleNewPassSubmit}>
                    <Form.Group className="mb-3" controlId="respasPassword">
                      <Form.Label>Enter new password</Form.Label>
                      <Form.Control
                        placeholder="New password"
                        name="password"
                        value={formData.password}
                        onChange={changeFormData}
                        className="mx-auto loginField"
                        type="password"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                      <Form.Label>Repeat password</Form.Label>
                      <Form.Control
                        placeholder="New password"
                        name="repeatpassword"
                        value={formData.repeatpassword}
                        onChange={changeFormData}
                        className="mx-auto loginField"
                        type="password"
                      />
                      {(formData.password !== formData.repeatpassword)? (

                      <Form.Text className="text-muted resetPasswordmis">
                Passwords do not match!
              </Form.Text>
                      ): null}
                    </Form.Group>
                    <div>
                    <button className="addNoteButton" type="submit" disabled={formData.password !== formData.repeatpassword}>Change</button>
                    </div>
                    </Form>
                  </div>
                  </>): (<>
                    <div>
                  <Form onSubmit={handleVerifyOTP}>
                    <Form.Group className="mb-3" controlId="respasOTP">
                      <Form.Label>OTP Sent</Form.Label>
                      <Form.Control
                        placeholder="Enter OTP"
                        name="OTP"
                        value={formData.OTP}
                        onChange={changeFormData}
                        className="mx-auto loginField"
                      />
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>
                <div>
                  <button className="addNoteButton mx-2" type="submit">Verify</button>
                  <button className="addNoteButton mx-2" onClick={handleEmailSubmit} disabled={resendButtonDisabled}>Resend</button>
                </div>
                {resendButtonDisabled? (
                  <div className="resendTimer">
                    Can resend OTP in {countdown} {countdown<=1?"second":"seconds"}.
                  </div>
                ):null}
                  </Form>
                </div>
                  </>)}
              </div>
            </>
          ) : (
            <>
              <div>
                <Form onSubmit={handleEmailSubmit}>
                  <Form.Group className="mb-4" controlId="respasEmail">
                    <Form.Label style={{marginBottom:"10%"}}>Enter your email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={changeFormData}
                      className="mx-auto loginField"
                    />
                    <Form.Text className="text-muted">
                      {/* We'll never share your email with anyone else. */}
                    </Form.Text>
                  </Form.Group>
              <div className="mt-3">
                <button className="addNoteButton" type="submit">
                  Submit
                </button>
              </div>
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
