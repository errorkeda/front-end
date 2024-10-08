import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import './Login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // New state for checkbox
  const serviceBackendURL = props.data.backendServiceURL || "";
  const serviceFrontendURL = props.data.frontendServiceURL || "";

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateFormData = () => {
    const regex = /^(\+91[\-\s]?)?[789]\d{9}$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email && !password) {
      setMessage('*Please enter required values');
      return false;
    } else if (!regex.test(email)) {
      setMessage('*Please enter a valid email or mobile number');
      return false;
    } else if (!isChecked) { // Check if checkbox is checked
      setMessage('*You must accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validateFormData();
    const loginData = {
      email: email,
      password: password
    };
    if (isValid) {
      try {
        const response = await axios.post(serviceBackendURL + '/laundrino/user/v2/login', loginData, {
          headers: {
            'Content-Type': 'application/json',
            'IsAuthorized': true,
          },
          withCredentials: true,
        });
        if (response.data.success) {
          let token = response.data && response.data.token;
          localStorage.setItem('token', token);
          window.location.href = '/';
        } else {
          setMessage('Login failed. Please check your credentials.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="container form-container">
        <div className="row">
          <div className="col-lg-6 col-md-12 order-md-1">
            <img src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Account/Sign+Up/Rectangle+600.png" alt="Sign In Image" className="img-fluid" />
          </div>
          <div className="col-lg-6 col-md-12 order-md-2 p-5 pt-0">
            <h2 className="text-center">Sign In</h2>
            <p className="text-center">Welcome back, enter your details below.</p>
            <form onSubmit={handleLogin}>
              <div className="form-group input-group ingBut">
                <input
                  type="text"
                  className="form-control"
                  placeholder="*Enter email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                />
                <i className="fa fa-envelope mt-4 texttag"></i>
              </div>
              <div className="form-group input-group ingBut" >
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="form-control"
                  maxLength={11}
                />
                <span onClick={togglePasswordVisibility} className='password'>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="mb-3 mt-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheckbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)} // Update state on change
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  I accept the <a href="/">Terms And Conditions</a>
                </label>
              </div>
              {/* <p className='description'>For your security, we recommend only checking this box on your personal devices.</p> */}
              <a href='/terms-and-condition' style={{fontSize:"15px", color:"blue"}} className='description'>Visit Here to know terms and conditions</a>
              <p style={{ color: 'red' }}>{message}</p>
              <button type="submit" className="btn btn-primary btn-block loginFormBtn" disabled={!isChecked}>Login Now</button>
              <p className="text-center pt-2 mb-0">Forgot Password? <a href="#">Reset</a></p>
              <div className="text-center social-icons mt-3">
                {/* <p className="infoP">By clicking on Login with Gmail, Instagram, Twitter, or Facebook, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.</p> */}
                <br />
                <p className="infoP mb-0">Don't have an account? <a href="/signup">Signup</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
