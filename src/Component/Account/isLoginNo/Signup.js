import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const validateMobile = (mobile) => {
  const mobileRegex = /^(\+91[\-\s]?)?[789]\d{9}$/;
  return mobileRegex.test(mobile);
};

const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};
const Signup = (props) => {
  const [enterOtp, setEnterOtp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const serviceBackendURL = props.data.backendServiceURL || "";
  const serviceFrontendURL = props.data.frontendServiceURL || "";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    let validEmail = validateEmail(formData.email);
    let validmobile = validateMobile(formData.phoneNumber);

    if (validEmail && validmobile) {
      try {
        const otp_response = await axios.post(serviceBackendURL + "/laundrino/otp_verify", formData);
        let otpData = otp_response.data || "";
        if (otpData && otpData.success === true && otpData.message === "OTP Verified Successfully") {
          const response = await axios.post(serviceBackendURL + "/laundrino/user/v2/register",
            {
              name: formData.fullName,
              email: formData.email,
              password: formData.password,
              mobile: formData.phoneNumber,
            }
          );
          if (response.data.success) {
            let token = response.data && response.data.token;
            localStorage.setItem('token', token);
            setSuccess("Registration successful");
            setError("");
            window.location.href = "/";
          }
        }else{
          setError("OTP Verification Failed");
        }
      } catch (err) {
        setError("Registration failed");
      }
    } else {
      setError("*Please enter valid details");
    }
  };

  const sendOTP = async () => {
    try {
      let sendOTP = await axios.post(
        serviceBackendURL + "/laundrino/otp_generation",
        formData
      );
      setEnterOtp(true);
    } catch (error) {
      alert(error);
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="container form-container">
      <div className="row">
        <div className="col-lg-6 col-md-12 order-md-1">
          <img
            src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Account/Sign+Up/Rectangle+600.png"
            alt="Sign In Image"
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 col-md-12 order-md-2 p-4 pt-0">
          <h2 className="text-center">Register Account</h2>
          <p className="text-center">
            Create an account to save your progress and access unlimited
            features.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="*Full Name" name="fullName" value={formData.fullName} onChange={handleChange}/>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="*Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group input-group ingBut">
              <input type="text" className="form-control" placeholder="*Email Address" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group input-group ingBut">
              <input type="password" placeholder="*Password" className="form-control" name="password" value={formData.password} onChange={handleChange}/>
            </div>
            <div className="form-group input-group ingBut">
              <input type="password" placeholder="*Confirm Password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
            </div>
            <div className="form-group" style={{ display: enterOtp ? "block" : "none" }}>
              <input type="text" className='form-control input-color' name="otp" id="otp" maxLength={6} placeholder="Enter OTP" value={formData.otp} onChange={handleChange}/>
            </div>
            <button type="button" className="btn btn-primary btn-block loginFormBtn mt-5" style={{ display: !enterOtp ? "block" : "none" }} onClick={sendOTP}>Sign Up</button>
            <button type="submit" className="btn btn-primary btn-block loginFormBtn mt-5" style={{ display: enterOtp ? "block" : "none" }}>
              Enter OTP
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <div className="alert alert-success">{success}</div>}
            {/* <button
              type="submit"
              className="btn btn-primary btn-block loginFormBtn mt-5"
            >
              Sign Up
            </button> */}
            {/* <div className="text-center social-icons mt-3">
                            <div className="row p-5 pt-3">
                                <div className="col-lg-3 col-md-3 col-sm-3 mb-4 mb-lg-0">
                                    <a className="btn btn-primary text-light iconImage" href="#!" role="button">
                                        <i className="fab fa-2x fa-instagram"></i>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 mb-4 mb-lg-0">
                                    <a className="btn btn-primary text-light iconImage" href="#!" role="button">
                                        <i className="fab fa-2x fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 mb-4 mb-lg-0">
                                    <a className="btn btn-primary text-light iconImage" href="#!" role="button">
                                        <i className="fab fa-2x fa-google"></i>
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 mb-4 mb-lg-0">
                                    <a className="btn btn-primary text-light iconImage" href="#!" role="button">
                                        <i className="fab fa-2x fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                            <p className="infoP">By creating an account, you agree to our <a href="/">Terms and Conditions</a> and <a href="/">Privacy Policy</a>.</p>
                            <br />
                            <p className="infoP mb-0">Already have an account? <a href="/login">Signin</a></p>
                        </div> */}
            <div className="text-center social-icons mt-3">
              <p className="infoP mb-0"> Already have an account <a href="/login">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
