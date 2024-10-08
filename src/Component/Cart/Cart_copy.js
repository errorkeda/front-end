import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
const cartId = localStorage.getItem('cartId');
const Cart = (props) => {
  const [cartDetails, setCartDetails] = useState({});
  const serviceBackendURL = props.data.backendServiceURL || "";
  const serviceFrontendURL = props.data.frontendServiceURL || "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(serviceBackendURL + '/laundrino/get-card-details?id=' + cartId);
        setCartDetails(response.data.getCartDetails);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteService = (productIndex, serviceKey) => {
    const updatedCartDetails = { ...cartDetails };
    const selectedProduct = updatedCartDetails.selectedProduct[productIndex];
    selectedProduct.serviceTotalPrice -= selectedProduct.selectedServiceWithPriceValue[serviceKey];
    delete selectedProduct.selectedServiceWithPriceValue[serviceKey];
    selectedProduct.noOfServiceSelected -= 1;
    setCartDetails(updatedCartDetails);
  };

  const handleDeleteProduct = (productIndex, serviceKey) => {
    const updatedCartDetails = { ...cartDetails };
    updatedCartDetails.selectedProduct.splice(productIndex, 1);
    let servicePrice = 0;
    if (updatedCartDetails.selectedProduct) {
      updatedCartDetails.selectedProduct.forEach((product) => {
        servicePrice += product.serviceTotalPrice;
      });
    }
    updatedCartDetails.serviceTotal = servicePrice;
    updatedCartDetails.shippingCharge = servicePrice > 800 ? 0 : 80;
    updatedCartDetails.subTotal = updatedCartDetails.serviceTotal + updatedCartDetails.shippingCharge;
    updatedCartDetails.GST = updatedCartDetails.subTotal * 0.18;
    updatedCartDetails.grandTotal = updatedCartDetails.subTotal + updatedCartDetails.GST;
    setCartDetails(updatedCartDetails);
  };
  

  const update_cart_data = () => {
    let data = JSON.stringify(cartDetails);
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: serviceBackendURL + '/laundrino/get-card-details?id=' + cartId,
      data: data
    };

    axios.request(config)
      .then((response) => {
        window.location.href = '/checkout';
      })
      .catch((error) => {
        console.log(error);
      });

  }

  if (!cartId) {
    return (<>
      <br /><br />
      <h2 style={{ textAlign: "center" }}>No Cart Is Selected!!</h2>
      <br /><br />
    </>)
  }

  return (
    <>
      {cartDetails && (
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <p className="mt-3">
                Home <i className="fa-solid fa-angle-right "></i> <b>Add To Cart</b>
              </p>
              <p>
                Please fill in the fields below and click place order to complete your purchase!
                <br /> Already Registered?
                <a href="" className="atcLink"> Please login here</a>
              </p>
            </div>
            <div className="col-md-4 addCard">
              <div className="card">
                <div className="card-body cart-summary">
                  <div className="summary-item">
                    <div className="summary-title">Service Total</div>
                    <div className="summary-value">₹{cartDetails.serviceTotal}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">Shipping</div>
                    <div className="summary-value">₹{cartDetails.shippingCharge}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">Subtotal</div>
                    <div className="summary-value">₹{cartDetails.subTotal}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-title">GST</div>
                    <div className="summary-value">₹{Math.round(cartDetails.GST)}</div>
                  </div><hr/>
                  <div className="summary-item">
                    <div className="summary-title">Grand Total</div>
                    <div className="summary-value">₹{Math.round(cartDetails.grandTotal)}</div>
                  </div>
                  <button href="/checkout" onClick={update_cart_data} className="btn btn-primary ">Proceed To Checkout</button>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="row listHeading text-light p-3">
              <div className="col-4"><strong>Product Details</strong></div>
              <div className="col-2 text-center"><strong>Price</strong></div>
              <div className="col-2 text-center"><strong>Subtotal</strong></div>
              <div className="col-2 text-center"><strong>Action</strong></div>
            </div>

            {cartDetails.selectedProduct && cartDetails.selectedProduct.map((product, productIndex) => (
              <div className="card m-3" key={productIndex}>
                <div className="row no-gutters">
                  <div className="col-md-2 col-sm-4 product-image-container">
                    <img src={product.images[0].url} className="product-image" alt={product.images[0].public_id} />
                  </div>
                  <div className="col-md-3 col-sm-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p>{product.productName} <font color="grey">({product.noOfServiceSelected} Service Selected)</font></p>
                      </div>
                      <div className="mt-3">
                        {Object.entries(product.selectedServiceWithPriceValue).map(([service, price], idx) => (
                          <div key={idx}>
                            <div className="service-row d-flex justify-content-between">
                              <h6>{service.replace(/_/g, ' ')}</h6>
                              <span>₹{price}</span>
                              <i className="fa-solid fa-trash-can" onClick={() => handleDeleteService(productIndex, service)}></i>
                            </div>
                            {idx < product.noOfServiceSelected - 1 && <hr />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-6 d-flex justify-content-center mt-3">
                    <h4>₹{product.serviceTotalPrice}</h4>
                  </div>
                  <div className="col-md-2 col-sm-6 d-flex justify-content-center mt-3">
                    <h4>₹{product.serviceTotalPrice}</h4>
                  </div>
                  <div className="col-md-1 col-sm-6 d-flex justify-content-center mt-3 actionTrash">
                    <i className="fa-solid fa-trash-can" onClick={() => handleDeleteProduct(productIndex, product)}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
