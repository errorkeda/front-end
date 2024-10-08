import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
import "./Service.css";
let serviceObj = {
  dry_clean: "DryClean",
  roll_press: "RollPress",
  dyeing: "Dyeing",
  starch: "Starch",
  petrol_wash: "PetrolWash",
  antiseptic_wash: "AntisepticWash",
  fabric_softener: "FabricSoftener",
  normal_iron: "NormalIron",
  steam_iron: "SteamIron",
  wash_fold: "WashAndFold",
  wash_iron: "WashAndIron",
  wash_steam_iron: "WashAndSteam",
};
const iscartId = localStorage.getItem("cartId");

function getServiceValue(service) {
  // const parts = useParams;
  // const serviceIndex = parts.indexOf("service") + 1;
  // let selected_serive = serviceObj[parts[serviceIndex]];
  // return selected_serive || null;

  let selected_service = serviceObj[service];
  return selected_service || null;
}
const Service = (props) => {
  //const service = getServiceValue(window.location.href);
  const { ser } = useParams(); // Use useParams inside the component
  const backendURL =  props.data.backendServiceURL || "";
  const service = getServiceValue(ser); // Pass the service param to getServiceValue
  //const [service, setService] = useState(new URLSearchParams(window.location.search).get('service'));
  let checkedId = service || null;
  // const [checkedId, setCheckedId] = useState(service || null);
  const [itemList, setItemList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeLink, setActiveLink] = useState("Women");
  let serviceURL = "Women";
  let currentService = service.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  useEffect(() => {
    if (cartItems.length > 0) {
      Save_Cart_Data();
    }
  }, [cartItems]);
  // Function to handle service call
  const handleServiceToggle = (service) => {
    serviceURL = service;
    serviceCall();
  };

  // Function to handle quantity change
  const handleQuantityChange = (amount, category) => {
    setItemList((prevItemList) =>
      prevItemList.map((item) => {
        if (item.title === category) {
          const newQuantity = Math.max(item.quantity + amount, 1);
          const pricePerUnit = item.servicePrice / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            servicePrice: pricePerUnit * newQuantity,
          };
        }
        return item;
      })
    );
  };

  // Function to add items to cart
  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem.title === item.title
      );
      if (existingItemIndex > -1) {
        // Update the existing item
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += item.quantity;
        updatedCartItems[existingItemIndex].servicePrice = item.servicePrice;
        return updatedCartItems;
      } else {
        // Add new item
        return [...prevCartItems, { ...item, quantity: item.quantity }];
      }
    });
  };
  console.log(cartItems);

  // Fetch data on component mount
  const serviceCall = () => {
    // const url =  process.env.REACT_APP_API_URL + '/laundrino/getcategoryservice?categoryName=' + serviceURL;
    const url = backendURL + "/laundrino/getcategoryservice?categoryName=" + serviceURL;
    setItemList([]);
    axios
      .get(url)
      .then((response) => {
        const productDetails =
          response.data?.categoryService[0]?.productListWithServicePrice || [];
        const updatedItemList = productDetails.map((product) => {
          const serviceData = Object.entries(product.services || {}).reduce(
            (acc, [key, value]) => {
              const newKey = key.replace(/[\s_+]+/g, "");
              acc[newKey] = value;
              return acc;
            },
            {}
          );

          return {
            title: product.productName || "",
            rating: Math.round(product.rating) || 0,
            imageSrc:
              product.ImageURL[0]?.url ||
              "https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Cetagory/still-life-with-classic-shirts-hanger.jpg",
            imageAlt: product.ImageURL[0]?.public_id || "",
            servicePrice: serviceData[service] || "",
            price: serviceData[service] || "",
            quantity: 1,
            selectedService: [service],
          };
        });

        setItemList(updatedItemList);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    if (service) {
      serviceCall();
    }
  }, [service]);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    let serviceObject = {
      DryClean: "dry_clean",
      RollPress: "roll_press",
      Dyeing: "dyeing",
      Starch: "starch",
      PetrolWash: "petrol_wash",
      AntisepticWash: "antiseptic_wash",
      FabricSoftener: "fabric_softener",
      NormalIron: "normal_iron",
      SteamIron: "steam_iron",
      WashFold: "wash_fold",
      WashIron: "wash_iron",
      WashSteamIron: "wash_steam_iron"
    }
    let service_id = serviceObject[id];
    window.location.href = "/service/" + service_id;
    // setCheckedId(prevCheckedId => (id === prevCheckedId ? null : id));
  };

  // Calculate total price of cart items
  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.servicePrice, 0);
  };

  //save data in cart

  const calculateValues = (items) => {
    // Calculate serviceTotal
    const serviceTotal = items.reduce(
      (total, item) => total + item.servicePrice,
      0
    );

    // Calculate subTotal (same as serviceTotal in this case)
    const subTotal = serviceTotal;

    // Shipping charge
    const shippingCharge = 80;

    // GST calculation (assuming 18% GST)
    //const GST = subTotal * 0.18;

    // Grand Total
    const grandTotal = subTotal  //+ GST + shippingCharge;

    // Prepare selected products
    const selectedProduct = items.map((item) => ({
      productName: item.title,
      selectedServiceWithPriceValue: {
        [item.selectedService[0]]: item.servicePrice,
      },
      noOfServiceSelected: item.selectedService.length,
      images: [
        {
          public_id: item.imageAlt,
          url: item.imageSrc,
        },
      ],
      serviceTotalPrice: item.servicePrice,
    }));

    // Total selected products count
    const totalSelectedProduct = items.length;

    return {
      serviceTotal,
      shippingCharge,
      subTotal,
     // GST,
      grandTotal,
      selectedProduct,
      totalSelectedProduct,
    };
  };

  const Save_Cart_Data = async () => {
    console.log("service Called");
    const result = calculateValues(cartItems);
    console.log(result);
    if (iscartId) {
      const response = await axios.get(
        backendURL + "/laundrino/get-card-details?id=" + iscartId,
        {
          headers: {
            Cookie:
              "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc1YTkwMGI3NDYxYzM1ODc3MjNmOCIsImlhdCI6MTcyMTMyMDk2OCwiZXhwIjoxNzIxNzUyOTY4fQ.STeFrCLx61f877oS7EaMS9j_A0RaZVJxzmDpn2O0WwY",
          },
        }
      );
      let save_data = response.data.getCartDetails;
      save_data.serviceTotal += result.serviceTotal;
      save_data.shippingCharge = result.serviceTotal >= 800 ? 0 : 80;
      save_data.subTotal = result.serviceTotal + result.shippingCharge;
    //  save_data.GST = result.subTotal * 0.18 || 0;
      save_data.grandTotal = result.subTotal //+ result.GST;
      let productList = result.selectedProduct || [];
      productList.forEach((element) => {
        save_data.selectedProduct.push(element);
      });
      save_data.totalSelectedProduct += productList.length;
      await axios
        .put(backendURL + "/laundrino/get-card-details?id=" + iscartId, save_data)
        .then(function (response) {
          //window.location.href = '/addtocart';
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      let save_data = result;
      await axios
        .post(backendURL + "/laundrino/addcartdetails/new", save_data)
        .then(function (response) {
          console.log(response);
          let cartId =
            (response &&
              response.data &&
              response.data.addCartDetails &&
              response.data.addCartDetails._id) ||
            "";
          localStorage.setItem("cartId", cartId);
          //window.location.href = '/addtocart';
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  const checkout_product = () => {
    if (cartItems.length > 0) {
      window.location.href = "/addtocart";
    }
  };
  return (
    <>
      <section>
        <div className="banner-image d-flex justify-content-center align-items-center">
          <div className="content text-center serviceCont">
            <h5>
              Free Shipping Will Be Allowed Only Above ₹500/- Service Charged
            </h5>
            <h1>
              Laundry <b>Service</b>
            </h1>
          </div>
        </div>
      </section>
      <h2 className="ServicesName">{currentService || ""}</h2>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <h5>Service Type</h5>
            {[
              "DryClean",
              "RollPress",
              "AntisepticWash",
              "FabricSoftener",
              "PetrolWash",
              "NormalIron",
              "Starch",
              "Dyeing",
              "SteamIron",
              "WashFold",
              "WashIron",
              "WashSteamIron",
            ].map((serviceType) => (
              <div className="form-check mt-2" key={serviceType}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={serviceType}
                  checked={checkedId === serviceType}
                  onChange={() => handleCheckboxChange(serviceType)}
                />
                <label className="form-check-label" htmlFor={serviceType}>
                  {serviceType
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
          <div className="col-lg-9 col-md-12">
            <nav className="navbar navbar-expand-md navbar2">
              <div
                className="navbar-collapse collapse pt-2 pt-md-0"
                id="navbar2"
              >
                <ul className="navbar-nav mx-auto">
                  {[
                    "Women",
                    "Men",
                    "Woolen",
                    "Household",
                    "Accessories",
                    "Kids",
                  ].map((link) => (
                    <li className="nav-item" key={link}>
                      <a
                        className={`nav-link ${
                          activeLink === link ? "navbar2-active" : ""
                        }`}
                        onClick={() => {
                          setActiveLink(link);
                          handleServiceToggle(link.toUpperCase());
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="row mt-3">
              {itemList.map((item) => (
                <div className="col-lg-6 col-md-6 mb-4" key={item.title}>
                  <div className="card serviceCard">
                    <div className="card-body">
                      <div className="d-flex">
                        <img
                          src={item.imageSrc}
                          className="img-fluid mr-3"
                          alt={item.imageAlt}
                        />
                        <div className="m-3">
                          <h5 className="card-title">{item.title}</h5>
                          <div className="card-rating">
                            <ul className="list-inline small">
                              {[...Array(item.rating)].map((_, i) => (
                                <li className="list-inline-item m-0" key={i}>
                                  <i className="fa fa-star text-warning"></i>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="card-price">₹{item.servicePrice || "No Service Available"}</div>
                          <div className="quantity-controls my-2 justify-content-center">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() =>
                                handleQuantityChange(-1, item.title)
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control mx-2"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() =>
                                handleQuantityChange(1, item.title)
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="product-buttons">
                            <button className="btn btn-primary">Details</button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {cartItems.length > 0 && (
        <footer className="footer fixed-bottom stickyFooter" id="finalresult">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="row">
                  {cartItems.length > 0 ? (
                    cartItems.map((product, index) => (
                      <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                        <div className="d-flex flex-column">
                          <button
                            className="btn btn-link close-btn align-items-end"
                            onClick={() => {
                              setCartItems((prevCartItems) =>
                                prevCartItems.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                          <h6 className="service-title">{product.title}</h6>
                          <p className="service-price">
                            ₹{product.servicePrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items in cart</p>
                  )}
                </div>
              </div>
              <div
                className="col-lg-3 totalPriceSec"
                style={{ textAlign: "right" }}
              >
                <div className="total-price">
                  Total Price: ₹{getTotalPrice().toFixed(2)}
                </div>
                <button
                  className="btn btn-primary ml-3 ms-2"
                  onClick={checkout_product}
                >
                  checkout
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Service;
