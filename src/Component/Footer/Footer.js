import React, { useState } from 'react';
import './Footer.css';
import axios from 'axios';

const Footer = (props) => {
  const backendURL = props.data.backendServiceURL || "";
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    const reqBody = { email };

    try {
      const subsRes = await axios.post(`${backendURL}/laundrino/create_subscriber`, reqBody);
      if (subsRes.status === 201) {
        alert("Subscription successful!");
        setEmail(""); // Clear input after successful subscription
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <footer className="whiteSec">
      <div className="container py-5">
        <div className="row py-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <a className="navbar-brand" href="/">
              <h3 className='FooterFirstName'>LAUNDRI</h3>
              <h3 style={{color:"aqua"}}className='FooterSecondName'>NO</h3>
            </a>
            <ul className="list-inline mt-2">
              <p className="font-italic follow">Follow With Us</p>
              <li className="list-inline-item">
                <a href="https://www.facebook.com/"><i className="fab social_media fa-facebook-square"></i></a>
              </li>
              <li className="list-inline-item">
                <a href="https://x.com/Laundrino_Mum?s=09"><i className="fab social_media fa-twitter"></i></a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com/laundrino?igsh=MWJqMDNjY216bG1tMQ=="><i className="fab social_media fa-instagram"></i></a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.linkedin.com/company/laundrino/"><i className="fab social_media fa-linkedin-in"></i></a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 mb-4 mb-lg-0 footerContent">
            <h6 className="text-uppercase font-weight-bold mb-4">Category</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2 servicetext"><a href="/category/Men">MEN</a></li>
              <li className="mb-2 servicetext"><a href="/category/Women">WOMEN</a></li>
              <li className="mb-2 servicetext"><a href="/category/Accessories">ACCESSORIES</a></li>
              <li className="mb-2 servicetext"><a href="/category/Household">HOUSEHOLD</a></li>
              <li className="mb-2 servicetext"><a href="/category/Woolen">WOOLEN</a></li>
              <li className="mb-2 servicetext"><a href="/category/Kids">KIDS</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 mb-4 mb-lg-0 footerContent">
            <h6 className="text-uppercase font-weight-bold mb-4">SERVICES</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2 servicetext"><a href="/service/dry_clean">DRY CLEAN</a></li>
              <li className="mb-2 servicetext"><a href="/service/roll_press">ROLL PRESS</a></li>
              <li className="mb-2 servicetext"><a href="/service/dyeing">DYEING</a></li>
              <li className="mb-2 servicetext"><a href="/service/starch">STARCH</a></li>
              <li className="mb-2 servicetext"><a href="/service/petrol_wash">PETROL WASH</a></li>
              <li className="mb-2 servicetext"><a href="/service/antiseptic_wash">ANTISEPTIC WASH</a></li>
              <li className="mb-2 servicetext"><a href="/service/fabric_softener">FABRIC SOFTENER</a></li>
              <li className="mb-2 servicetext"><a href="/service/normal_iron">NORMAL IRON</a></li>
              <li className="mb-2 servicetext"><a href="/service/steam_iron">STEAM IRON</a></li>
              <li className="mb-2 servicetext"><a href="/service/wash_fold">NORMAL WASH</a></li>
              <li className="mb-2 servicetext"><a href="/service/wash_iron">WASH IRON</a></li>
              <li className="mb-2 servicetext"><a href="/service/wash_steam_iron">WASH STEAM IRON</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4 footerContent px-0">Subscribe Newsletter</h6>
            <div className="p-1 rounded">
              <div className="input-group ingBut">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="button-addon1" 
                  className="form-control border-2 shadow-0" 
                />
              </div>
            </div>
            <button 
              className="btn btn-primary btn-block subscriBut loginFormBtn" 
              onClick={subscribe} 
              type="button"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* Start Footer Bottom Area */}
      <div className="container footer-bottom-area">
        <hr />
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <i className="bx bx-copyright">Copyright 2024 All rights reserved.</i>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 ms-auto">
            <p>Podcast Powered By LaundriNo</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
