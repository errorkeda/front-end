import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar.js";
import Footer from "./Component/Footer/Footer.js";
import Member from "./Component/MemberSubscriber/Member.js";
import Home from "./Component/Home/Home.js";
import Service from "./Component/Service/Service.js";
import Category from "./Component/Category/Category.js";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Component/Checkout/Checkout.js";
import Cart from "./Component/Cart/Cart.js";
import Thankyou from "./Component/ThankYou/Thankyou.js";
import Login from "./Component/Account/isLoginNo/Login.js";
import Signup from "./Component/Account/isLoginNo/Signup.js";
import Profile from "./Component/Account/isLoginYes/Profile.js";
import ProductDetails from "./Component/ProductDetails/ProductDetails.js";
import MyService from "./Component/Account/isLoginYes/MyService.js";
import Blog from "./Component/Blog/Blog.js";
import Complaint from "./Component/Account/isLoginYes/Complaint.js";

let contextData = {
  backendServiceURL: process.env.BACKEND_URL || "http://3.109.31.5:4000",
  frontendServiceURL: process.env.FRONTEND_URL || "https://13.126.39.193:3000",
};

const App = () => {
  const [user, setUser] = useState("");
  const [member, setMember] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
        };
        let token = getCookie("token") || localStorage.getItem("token");
        const userConfig = {
          method: "get",
          url: contextData.backendServiceURL + '/laundrino/user/v2/me',
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        };
        const response = await axios(userConfig);
        if (response.data.success) {
          const userDetails = response.data.user;
          const memberConfig = {
            method: "post",
            url: contextData.backendServiceURL + '/laundrino/get_member',
            headers: {Authorization: `Bearer ${token}`},
            withCredentials: true,
            data: { email: userDetails.email }
          };
          const memberRes = await axios(memberConfig);
          if (memberRes.data.success) {
            setMember(true);
          }
          contextData.user = response.data.user;
          setUser(contextData.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="app">
      <Navbar data={contextData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtocart" element={<Cart data={contextData} />} />
        <Route path="/checkout" element={<Checkout data={contextData} />} />
        <Route
          path="/category/:cat"
          element={<Category data={contextData} />}
        />
        <Route path="/service/:ser" element={<Service data={contextData} />} />
        <Route path="/thankyou" element={<Thankyou data={contextData} />} />
        <Route path="/login" element={<Login data={contextData} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/signup" element={<Signup data={contextData} />} />
        <Route path="/profile" element={<Profile data={contextData} />} />
        <Route path="/my_services" element={<MyService data={contextData}/>} />
        <Route
          path="/product_details"
          element={<ProductDetails data={contextData} />}
        />
      </Routes>
      {!member ? null : <Member data={contextData} />}
      <Footer data={contextData} />
    </div>
  );
};

export default App;
