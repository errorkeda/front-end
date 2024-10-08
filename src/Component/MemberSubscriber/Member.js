import React, { useState } from "react";
import axios from "axios";
import "./Member.css";

const Member = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    desc: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [enterOtp, setEnterOtp] = useState(false);
  const backendURL = props.data.backendServiceURL || "";
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.phoneNo) newErrors.phoneNo = true;
    if (!formData.email) newErrors.email = true;
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid";
    if (!formData.desc) newErrors.desc = true;
    if (!formData.otp) newErrors.otp = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    if (validateForm()) {
      try {
        const otp_response = await axios.post(
          backendURL + "/laundrino/otp_verify",
          formData
        );
        let otpData = otp_response.data || "";
        if (otpData) {
          if (otpData.success === true && otpData.message === "OTP Verified Successfully") {
            const response = await axios.post(backendURL + "/laundrino/create_member", formData);
            setSuccessMessage("Message sent successfully!");
            setFormData({
              name: "",
              phoneNo: "",
              email: "",
              desc: "",
              otp: "",
            });
            document.getElementById("congratulationModal").style.display = "block";
          }
          if (otpData.success === false && otpData.message === "OTP Mismatched") {
            console.error("Error sending message: OTP Mismatched");
            setErrors({form: "OTP Mismatched"});
          }
        } else {
          setErrors({form: "There was an error sending your message. Please try again."});
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setErrors({
          form: "There was an error sending your message. Please try again.",
        });
      }
    }
    setIsSubmitting(false);
  };

  const handlerMember = () => {
    window.location.href = "/";
  };
  const sendOTP = async () => {
    try {
      let sendOTP = await axios.post(
        backendURL + "/laundrino/otp_generation",
        formData
      );
      setEnterOtp(true);
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors({
        form: "There was an error sending your OTP. Please try again.",
      });
    }
  };
  return (
    <>
      <section>
        <div className="contact-section">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-details">
                <h2>Become A Member For Daily Service</h2>
                <p>
                  All of our services are carefully completed to meet your
                  requirements. We aim to deliver fast and effective customer
                  service and assist you when needed. Contact us today for more
                  information or inquiries.
                </p>
                <div className="contact-info">
                  <div className="icon">
                    <i className="fa fa-envelope fa-2x"></i>
                  </div>
                  <div className="text">
                    <div className="title">Email</div>
                    <div className="number">support@laundrino.in</div>
                  </div>
                </div>
                <div className="contact-info">
                  <div className="icon">
                    <i className="fa fa-phone fa-2x"></i>
                  </div>
                  <div className="text">
                    <div className="title">Call</div>
                    <div className="number">(+91) 956-939-5291</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  {errors.form && (
                    <div className="alert alert-danger">{errors.form}</div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control input-color ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control input-color ${
                        errors.phoneNo ? "is-invalid" : ""
                      }`}
                      id="phoneNo"
                      placeholder="Phone number"
                      value={formData.phoneNo}
                      onChange={handleChange}
                    />
                    {errors.phoneNo && (
                      <div className="invalid-feedback">{errors.phoneNo}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={`form-control input-color ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={`form-control  input-color ${
                        errors.desc ? "is-invalid" : ""
                      }`}
                      id="desc"
                      rows="5"
                      placeholder="Enter your message"
                      value={formData.desc}
                      onChange={handleChange}
                      style={{ backgroundColor: "black", color: "white" }}
                    ></textarea>
                    {errors.desc && (
                      <div className="invalid-feedback">{errors.desc}</div>
                    )}
                  </div>
                  <div
                    className="form-group"
                    style={{ display: enterOtp ? "block" : "none" }}
                  >
                    <input
                      type="text"
                      className={`form-control input-color ${
                        errors.phoneNo ? "is-invalid" : ""
                      }`}
                      id="otp"
                      maxLength={6}
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                    {errors.otp && (
                      <div className="invalid-feedback">{errors.otp}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ display: enterOtp ? "block" : "none" }}
                    onClick={sendOTP}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{ display: enterOtp ? "block" : "none" }}
                  >
                    {isSubmitting ? "Sending..." : "Enter OTP"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="congratulationModal" className="modal member_modal">
        <div className="modal-content">
          <div className="icon">
            <i className="fa fa-check-circle"></i> {/* Use a check icon */}
          </div>
          <h2 className="wishes">Congratulations!</h2>
          <p className="wishes_desc">You are the Member of our Team!!</p>
          <button onClick={handlerMember} className="btn ok">
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

export default Member;
