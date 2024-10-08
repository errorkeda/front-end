import React, { useEffect, useState } from "react";
import stateList from "./stateList.json";
import "./Checkout.css";
import axios from "axios";
const myParam = localStorage.getItem("cartId");
const Checkout = (props) => {
  const [cartDetails, setCartDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [isShippingDetailsSame, setisShippingDetailsSame] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNo: "",
    emailId: "",
    address2: "",
    state: "",
    zip: "",
  });
  const [checkoutFormData, setCheckoutFormData] = useState({
    checkout_address: "",
    checkout_country: "",
    checkout_state: "",
    checkout_zip: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    state: "",
    zip: "",
    country: "",
  });
  let isCod = false;
  const serviceBackendURL = props.data.backendServiceURL || "";
  const serviceFrontendURL = props.data.frontendServiceURL || "";
  let user_datails = (props && props.data && props.data.user) || "";
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value, type, checked } = e.target;
    if (e.target.id.includes("checkout")) {
      setCheckoutFormData({
        ...checkoutFormData,
        [id]: type === "checkbox" ? checked : value,
      });
    } else {
      setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.className.includes("cod")) {
      isCod = true;
      e.target = document.getElementById("addrValidation");
    }
    if (e.target.checkValidity() === false) {
      e.stopPropagation();
    } else {
      handleCheckout(e);
    }
    e.target.classList.add("was-validated");
  };

  const handleCheckout = async (e) => {
    try {
      e.preventDefault();
      const reqData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.emailId || "",
        address: `${formData.address} ${formData.address2 || ""}`,
        mobileNo: formData.mobileNo || "",
        state: formData.state || "",
        pinCode: formData.zip || "",
        cartId: cartDetails?._id,
        productServiceDetails: cartDetails || {},
        isShippingDetailsSame: isShippingDetailsSame,
      };
  
      const shippingDetailsData = isShippingDetailsSame
        ? {
            address: reqData.address,
            state: reqData.state,
            pinCode: reqData.pinCode,
            country: reqData.country || "", // Ensure this field exists
          }
        : {
            address: checkoutFormData.checkout_address || "",
            state: checkoutFormData.checkout_state || "",
            pinCode: checkoutFormData.checkout_zip || "",
            country: checkoutFormData.checkout_country || "",
          };
  
      reqData.shippingDetails = shippingDetailsData;
      const url = serviceBackendURL + '/laundrino/billing/new';
      const response = await axios.post(url, reqData);
      console.log(response.data);
  
      if (response.data?.success) {
        if (checkoutHandler && !isCod) {
          checkoutHandler(response);
        } else if (isCod) {
          // Uncomment and adjust the redirect URL as needed
          // window.location.href = `http://localhost:3000/thankyou?cardid=${myParam}`;
        }
      } else {
        console.error("Checkout failed:", response.data?.message || "Unknown error");
      }
    } catch (error) {
      alert(error);
      console.error("Error during checkout:", error);
    }
  };
  

  const checkoutHandler = async (props) => {
    try {
      const {
        data: { key },
      } = await axios.get(serviceBackendURL + "/api/getkey");
      const amount = cartDetails.grandTotal || 0;
      const receipt = "fmkireotj49";
      const currency = "INR";
      let fullName = formData.firstName + formData.lastName || "";
      let mobile = formData.mobileNo - 0 || 0;
      let email = formData.emailId || "";
      let cartId = myParam || "";
      const {
        data: { orderRes },
      } = await axios.post(serviceBackendURL + "/laundrino/create-order", {
        amount,
        currency,
        receipt,
        fullName,
        mobile,
        email,
        cartId
      });
      const options = {
        key,
        amount: orderRes.amount,
        currency: "INR",
        name: "LaundriNo",
        description: "Laundry Service",
        image: "https://example.com/your_logo",
        order_id: orderRes.id,
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          fetch(serviceBackendURL + '/laundrino/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email : formData.emailId || "",
              mobile : formData.mobileNo - 0 || 0
            })
          }).then(res => res.json())
            .then(data => {
              if (data.success === true) {
                window.location.href = serviceFrontendURL + "/thankyou?cardid=" + myParam;
              } else {
                alert('Payment verification failed');
              }
            }).catch(error => {
              console.error('Error:', error);
              alert('Error verifying payment');
            });
        }
      };
      let updateBillingInfo = {
        orderId: orderRes.id,
        transactionStatus: "Pending",
        paymentData: options,
      };
      await axios.put(serviceBackendURL + "/laundrino/get-billing-details?cartid=" + myParam, updateBillingInfo).then(() => {
          // Create a new Razorpay instance with the options
          const razor = new window.Razorpay(options);
          razor.open();
        }).catch((error) => {
          console.log("Error during the checkout process:", error);
        });
    } catch (error) {
      alert(error);
      console.error("Error during the checkout process:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          serviceBackendURL + "/laundrino/get-card-details?id=" + myParam
        );
        setCartDetails(response.data.getCartDetails);
        setUser(user_datails);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };
    fetchData();
  }, []);
  if (!cartDetails) {
    return <div>...Loading</div>;
  }
  function formatDate(date) {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  const currentDate = new Date();
  const newDate = addDays(currentDate, 5);
  const formattedDate = formatDate(newDate);
  const handleShippingChange = (event) => {
    if (event.target.checked) {
      const { value } = event.target;
      if (value === "shippingDetails") {
        setisShippingDetailsSame(false);
        // isShippingDetailsSame = false;
        document.getElementById("visible").style.display = "block";
      } else {
        document.getElementById("visible").style.display = "none";
      }
    }
  };

  return (
    <>
      <div className="m-5">
        <p className="mt-3 ">
          {" "}
          Home <i className="fa-solid fa-angle-right "></i> <b>Add To Cart</b>
        </p>
        <div className="py-5 ">
          <h2 className="checkHead">Check Out</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4 orderSum">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="">Order Summary</span>
              <span className="badge badge-secondary badge-pill">
                {cartDetails.totalSelectedProduct}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {cartDetails.selectedProduct.map((product, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between lh-condensed"
                >
                  <div className="d-flex">
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].public_id}
                      className="img-thumbnail mr-2 border-0"
                    />
                    <div className="ms-2">
                      <h6 className="my-0">{product.productName}</h6>
                      <small className="text-muted">
                        QT: {product.noOfServiceSelected}
                      </small>
                    </div>
                  </div>
                  <span className="priSty">
                    ₹{product.serviceTotalPrice.toFixed(2)}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between price">
                <span>
                  <strong>
                    Service Charge
                    <font color="#646262">
                      {" "}
                      ({cartDetails.totalSelectedProduct} items)
                    </font>
                  </strong>{" "}
                </span>
                <strong>₹{cartDetails.serviceTotal.toFixed(2)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between price">
                <span>
                  <strong>
                    Shipping Charge<font color="#646262"></font>
                  </strong>{" "}
                </span>
                <strong>₹{cartDetails.shippingCharge.toFixed(2)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between price">
                <span>
                  <strong>
                    Subtotal<font color="#646262"></font>
                  </strong>{" "}
                </span>
                <strong>₹{cartDetails.subTotal.toFixed(2)}</strong>
              </li>
              {/* <li className="list-group-item d-flex justify-content-between price">
                <span>
                  <strong>
                    GST Charge<font color="#646262"></font>
                  </strong>{" "}
                </span>
                <strong>₹{cartDetails.GST.toFixed(2)}</strong>
              </li> */}
              <li className="list-group-item d-flex justify-content-between totalPrice">
                <span>
                  <strong>Total Charge</strong>{" "}
                </span>
                <strong>₹{cartDetails.grandTotal.toFixed(2)}</strong>
              </li>
            </ul>
            <form className="card cod p-2 mt-5" onSubmit={handleSubmit}>
              <p className="codTag">Cash On Delivery</p>
              <p className="text-muted">
                Only free shipping is acceptable for Cash on Delivery.
              </p>
              <p className="text-muted">
                For cash on delivery, after filling details click here
              </p>
              <div className="input-group">
                {/* <input type="text" className="form-control" placeholder="" /> */}
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary w-100">
                    Book Service Now
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-8 order-md-1 billDetail">
            <h4 className="mb-3">Billing Details</h4>
            <form
              className="needs-validation"
              id="addrValidation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="mobileNo">Mobile/Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNo"
                    placeholder={user?.mobile || ""}
                    maxLength={10}
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Mobile number is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="emailId">Email-Id</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    placeholder=""
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Email-Id is required.</div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="row">
                {/* <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select className="custom-select d-block" id="country" value={formData.country} onChange={handleChange} style={{ width: "80%" }} required>
                    <option value="">Choose...</option>
                    <option>INDIA</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div> */}
                <div className="col-md-4">
                  <label htmlFor="state">City</label>
                  <select
                    className="custom-select d-block"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    required
                  >
                    <option value="">Choose...</option>
                    {Object.entries(stateList).map((data) => (
                      <option value={data[1].state} key={data[1].state}>
                        {data[1].state}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={6}
                    id="zip"
                    placeholder=""
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="mb-4" />
              {!isShippingDetailsSame ? null : <button
                className="btn btn-lg btn-block checkout"
                style={{
                  width: "100%",
                  backgroundColor: "#09ffa6",
                  color: "black",
                  fontWeight: "bold",
                }}
                type="submit"
              >
                Continue to checkout
              </button>}
            </form>
            <form className="needs-validation" novalidate="">
              <h4 className="mt-5">Shipping Address</h4>
              <p className="mb-3">
                Select the address that matches your card or payment method.
              </p>
              <div className="d-block my-3 m-5 paySec">
                <hr className="mb-4" />
                <div className="custom-control custom-radio">
                  <input
                    id="billingDetails"
                    name="paymentMethod"
                    value={"billingDetails"}
                    type="radio"
                    className="custom-control-input"
                    onClick={handleShippingChange}
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="billingDetails"
                  >
                    {" "}
                    Same as Billing address{" "}
                  </label>
                </div>
                <hr className="mb-4" />
                <div className="custom-control custom-radio">
                  <input
                    id="shippingDetails"
                    name="paymentMethod"
                    value={"shippingDetails"}
                    type="radio"
                    className="custom-control-input"
                    required
                    onClick={handleShippingChange}
                  />
                  <label
                    className="custom-control-label mb-3"
                    htmlFor="shippingDetails"
                    onClick={() =>
                      document.getElementById("shippingDetails").click()
                    }
                  >
                    Use a different shipping address
                  </label>
                </div>
              </div>

              <div id="visible" style={{ display: "none" }}>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="checkout_address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_address"
                      placeholder="1234 Main St"
                      value={checkoutFormData.checkout_address}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Please enter your shipping address.
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-md-5 mb-3">
                      <label htmlFor="checkout_country">Country</label>
                      <select className="custom-select d-block" id="checkout_country" value={checkoutFormData.checkout_country} onChange={handleChange} style={{ width: "80%" }} required>
                        <option value="">Choose...</option>
                        <option>INDIA</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div> */}
                    <div className="col-md-4">
                      <label htmlFor="checkout_state">State</label>
                      <select
                        className="custom-select d-block"
                        id="checkout_state"
                        value={checkoutFormData.checkout_state}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        required
                      >
                        <option value="">Choose...</option>
                        {Object.entries(stateList).map((data) => (
                          <option value={data[1].state} key={data[1].state}>
                            {data[1].state}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="checkout_zip">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="checkout_zip"
                        placeholder=""
                        value={checkoutFormData.checkout_zip}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <button
                    className="btn btn-lg btn-block"
                    style={{
                      width: "100%",
                      backgroundColor: "#09ffa6",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    onClick={handleCheckout}
                    type="submit"
                  >
                    {" "}
                    Continue to checkout
                  </button>
                </form>
              </div>
              <h4 className="mt-5">Shipping Details</h4>

              <div className="d-block my-3 m-5 paySec">
                <div className="custom-control custom-radio mt-5">
                  <input
                    id="debit"
                    name="paymentMethod2"
                    type="radio"
                    className="custom-control-input"
                    required=""
                    checked
                  />
                  <label
                    className="custom-control-label arrivalDate text-muted"
                    for="debit"
                  >
                    Arrives by {formattedDate}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
