import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './Profile.css';
import { useLocation } from 'react-router-dom';
const Profile = (props) => {
  const location = useLocation();
  const { userData } = location.state || { userData: {} };
  const [user, setUser] = useState(null);
  navigator.geolocation.getCurrentPosition(success, error);
  function success(position) {
    const latitude =  position.coords &&  position.coords.latitude || "";
    const longitude = position.coords && position.coords.longitude || "";
    getAddress(latitude, longitude);
}
function error(params) {
  console.log('Unable to retrive your location');
}
function getAddress(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data.display_name); // The full address
          setUser({...user,address2: data.display_name});
      })
      .catch(error => {
          console.error('Error fetching the address:', error);
      });
}

  let proposData = props && props.data;
  let user_datails = proposData.user || "";
  useEffect(()=>{
    setUser(user_datails);
  },[user_datails])
  const serviceBackendURL = proposData && proposData.backendServiceURL || "";
  const serviceFrontendURL = proposData && proposData.frontendServiceURL || "";
  return (
    <>
      <section className="profileBanner">
        <div className="banner-image d-flex justify-content-end align-items-end">
          {/* <div className="content m-5 mb-3">
            <i className="fa-solid fa-camera"></i>
          </div> */}
        </div>
      </section>

      <section className="profileSection">
        <div className="m-5">
          <div className="row">

            <div className=" col-md-4 order-md-1 mb-4 orderSum">

              <img src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Home/lovely-woman-pouring-detergent-cap.jpg" />
              <br />
              <i className="fa-solid fa-camera"></i>

            </div>
            <div className="col-md-8 order-md-2 billDetail">
              <div className="pb-5">
              <h1 className="">{user?.name || "Guest"}</h1>
                <div className="contactPart">
                  <a href="#"> <i className="fa-solid fa-phone "></i>{user?.mobile || "+91 9999999999"}</a>
                  <a href="#" className="contactPartMail"> <i className="fa-solid fa-envelope"></i>{user?.email || "welcome@laundriNo.com"}</a>
                </div>

                {/* <div className="carousel-action">
                  <a href="#" className="btn  btn-primary carPriBtn px-4">Create Review</a>
                  <a href="#" className="btn  btn-primary carPriBtn px-4">Edit Your Profile</a>
                </div> */}

              </div>

              <form className="needs-validation" novalidate="">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">Full name*</label>
                    <input type="text" className="form-control" id="firstName" placeholder="First name" value={user?.name || "Guest"} required="" />
                    <div className="invalid-feedback"> Valid first name is required. </div>
                  </div>
                  {/* <div className="col-md-6 mb-3">
                    <label for="lastName">Last name*</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Last name" value="" required="" />
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div> */}
                  {/* <div className="col-md-6 mb-3">
                    <label for="lastName">Country / Region*</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Country / Region" value="" required="" />
                    <div className="invalid-feedback"> Valid last name is required. </div>
                  </div> */}
                  <div className="col-md-6 mb-3">
                    <label for="address1">Street Adress*</label>
                    <input type="text" className="form-control" id="address1" placeholder="House number and street name" value="" required="" />
                    <div className="invalid-feedback"> Valid address is required. </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="address2">Apt, suite, unit</label>
                    <input type="text" className="form-control" id="address2" value={user?.address2 || ""} placeholder="Apt, suite, unit"/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="zip">Phone*</label>
                    <input type="text" className="form-control" id="zip" placeholder="mobile number" value={user?.mobile || "+91 9999999999"} required="" />
                    <div className="invalid-feedback"> Phone required. </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-4 mb-3">
                    <div className="col-md-12 mb-3">
                      <label for="lastName">City*</label>
                      <input type="text" className="form-control" id="lastName" placeholder="Mumbai" value="" required="" />
                      <div className="invalid-feedback"> Valid last name is required. </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-4 col-md-4 mb-3">
                    <label for="state">State*</label>
                    <select className="custom-select  w-100" id="state" required="">
                      <option value="" className="text-muted">Choose...</option>
                      <option>California</option>
                    </select>
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                  </div> */}
                  <div className="col-lg-4 col-md-4 mb-3">
                    <label for="zip">Postal Code*</label>
                    <input type="text" className="form-control" id="zip" placeholder="Postal Code" required="" />
                    <div className="invalid-feedback"> Zip code required. </div>
                  </div>
                </div>

              </form>
            </div>

          </div>

        </div>

      </section>
    </>
  )
}

export default Profile
