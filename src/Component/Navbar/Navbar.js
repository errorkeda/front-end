import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SlHandbag } from "react-icons/sl";

const Navbar = (props) => {
  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const serviceBackendURL = props && props.data && props.data.backendServiceURL || "";
  const serviceFrontendURL = props && props.data && props.data.frontendServiceURL || "";
  const user_datails = props && props.data && props.data.user || "";
  useEffect(()=>{
    if(user_datails){
      setUser(user_datails);
    }
  },[user_datails])
  const hardcodedSuggestions = [
    { label: "Men", id: 1 },
    { label: "Women", id: 1 },
    { label: "Kids", id: 1 },
    { label: "Accessories", id: 1 },
    { label: "Household", id: 1 },
    { label: "Woolen", id: 1 },
    { label: "Dry Clean", id: 2 },
    { label: "Roll Press", id: 2 },
    { label: "Antiseptic Wash", id: 2 },
    { label: "Fabric Softener", id: 2 },
    { label: "Normal Iron", id: 2 },
    { label: "Starch", id: 2 },
    { label: "Dyeing", id: 2 },
    { label: "Steam Iron", id: 2 },
    { label: "Wash Fold", id: 2 },
    { label: "Wash Iron", id: 2 },
    { label: "Wash Steam Iron", id: 2 },
  ];

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length >= 1) {
      const filteredSuggestions = hardcodedSuggestions.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setInputValue(item.label);
    setSuggestions([]);
    if (item.id === 1) {
      navigate(`/category/${encodeURIComponent(item.label)}`);
    } else {
      navigate(`/service/${encodeURIComponent(item.label)}`);
    }
  };
  const logout = async () => {
    try {
      await axios.get(serviceBackendURL + '/laundrino/user/v2/logout');
      localStorage.removeItem("token");
      setUser(null);
      console.log("Logout successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md fixed-top-sm justify-content-between navbar-dark text-light navbar1">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h3 className="logoFirstName">LAUNDRI</h3>
            <h3 className="logoSecondName">NO</h3>
          </a>
          {/* <p className="locationlogo"></p> */}
          {/* <a className="navbar-brand locationlogo" href="/"> */}
          {/* <img src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/Images/Location.png" className="locationIcon" alt="Location Icon" /> */}
          {/* <div className="location-container">
            <p className="mb-0">Delivery to Mumbai 400001</p>
            <h4 className="mt-0">Use Current Location</h4>
          </div> */}
          {/* </a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="input-group searchIcon">
            <input type="text" className="form-control" placeholder="Search.." />
            {/* <span className="input-group-btn">
              <button className="btn btn-primary loginFormBtn" type="button">
                <i className="fa fa-search"></i>
              </button>
            </span> 
          </div> */}
          <div className="input-group searchIcon">
            <input
              type="text"
              className="form-control autocomplete-input"
              value={inputValue}
              onChange={handleChange}
              onFocus={() =>
                inputValue && handleChange({ target: { value: inputValue } })
              }
              placeholder="Search..."
            />
            {/* Render suggestions */}
            {suggestions.length > 0 && (
              <ul className="suggestions-list autocomplete-suggestions">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="autocomplete-suggestion"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/category/women">
                      Women
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/category/men">
                      Men
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/category/woolen">
                      Woolen
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/category/household">
                      Household
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/category/accessories">
                      Accessories
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/category/kids">
                      Kids
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Service
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/service/dry_clean">
                      Dry Clean
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/roll_press">
                      Roll Press
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/dyeing">
                      Dying
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/starch">
                      Starch
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/petrol_wash">
                      Petrol Wash
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/service/antiseptic_wash"
                    >
                      Antiseptic Wash
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/service/fabric_softener"
                    >
                      Fabric Softner
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/normal_iron">
                      Normal Iron
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/steam_iron">
                      Steam Iron
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/wash_fold">
                      Wash-Fold
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/service/wash_iron">
                      Wash-Iron
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/service/wash_steam_iron"
                    >
                      Wash-Steam-Iron
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="/addtocart">
                  <SlHandbag size={25} color="aqua" /> 
                </Link>
              </li>
            </ul>
            <div className="nav-item dropdown profile-tab">      
              <a
                className="nav-link"
                id="navbarDropdownUser"
                role="button"
                // data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user ? (
                  <Avatar
                    alt="User Avatar"
                    src={user.avatar.url}
                    className="rounded-image"
                  />
                ) : (
                  <FaUser size={25} color="aqua"/>
                )}
              </a>
              <div className="dropdown-menu profile-nav">
                {user ? (
                  <>
                    <Link
                      className="dropdown-item"
                      to={{ pathname: "/profile", state: { user } }}
                    >
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/my_services">
                      My Service
                    </Link>
                    <Link className="dropdown-item" to="/complaint">
                      Complaint
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={logout} className="dropdown-item">
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                    <Link className="dropdown-item" to="/signup">
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-md navbar2">
        <div className="navbar-collapse collapse pt-2 pt-md-0" id="navbar2">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/service/dry_clean">
                Dry Clean
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/roll_press">
                RollPress
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/starch">
                Starch
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/dyeing">
                Dying
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/petrol_wash">
                Petrol Wash
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/antiseptic_wash">
                Antiseptic Wash
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/fabric_softener">
                Fabric Wash
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/normal_iron">
                Normal Iron
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/steam_iron">
                Steam Iron
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/wash_fold">
                Wash Fold
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/wash_iron">
                Wash Iron
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/wash_steam_iron">
                Wash Steam Iron
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
