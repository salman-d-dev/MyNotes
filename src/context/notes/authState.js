import React from 'react';
import authContext from './authContext';

const host = process.env.REACT_APP_BACKEND_HOST;

const AuthState = (props) => {
  const sendOTPf = async (email) => {
    try {
      const response = await fetch(`${host}/api/v1/auth/sendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while sending OTP' };
    }
  };

  const verifyOTPf = async (email, OTP) => {
    try {
      const response = await fetch(`${host}/api/v1/auth/verifyotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, OTP }),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while verifying OTP' };
    }
  };

  const signUpF = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while signing up' };
    }
  };

  const signInF = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/v1/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while signing in' };
    }
  };

  const getUserDataF = async () => {
    try {
      const response = await fetch(`${host}/api/v1/auth/user/getdetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while fetching user data' };
    }
  };

  const sendOTPAgainF = async (email) => {
    try {
      const response = await fetch(`${host}/api/v1/auth/sendotpagain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while sending OTP again' };
    }
  };

  const resetPasswordF = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/v1/auth/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while resetting password' };
    }
  };

  return (
    <authContext.Provider
      value={{
        sendOTPf,
        verifyOTPf,
        signInF,
        getUserDataF,
        signUpF,
        sendOTPAgainF,
        resetPasswordF,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
