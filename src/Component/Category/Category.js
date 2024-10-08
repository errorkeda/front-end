import React, { useEffect, useState } from "react";
import "./Category.css";
import { useLocation , useParams } from "react-router-dom";
import axios from "axios";
const iscartId = localStorage.getItem("cartId");
let SERVICE_API_URL = "";
const ProductCard = ({
  product,
  onServiceToggle,
  onQuantityChange,
  Save_Cart_Data,
}) => {
  const handleQuantityChange = (amount) => {
    onQuantityChange(product.id, Math.max(product.quantity + amount, 1));
  };
  const product_details = () => {
    window.location.href = "/productdetails";
  };
  const calculateTotalPrice = () => {
    const basePrice = product.price * product.quantity;
    const servicesPrice = product.selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
    return basePrice + servicesPrice * product.quantity;
  };

  return (
    <div className="col-lg-6 col-md-6 mb-4">
      <div className="card serviceCard">
        <div className="card-body">
          <div className="d-flex">
            <img
              src={product.imageUrl}
              className="img-fluid mr-3"
              alt={product.imageAlt}
            />
            <div className="m-3">
              <h5 className="card-title">{product.title}</h5>
              <div className="card-rating">
                <ul className="list-inline small">
                  {[...Array(Math.round(product.rating))].map((_, i) => (
                    <li className="list-inline-item m-0" key={i}>
                      <i className="fa fa-star text-warning"></i>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-price">₹{calculateTotalPrice()}</div>
              <div className="quantity-controls my-2 justify-content-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control mx-2"
                  value={product.quantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              <div className="product-buttons">
                <button className="btn btn-primary" onClick={product_details}>
                  Details
                </button>
                <button className="btn btn-secondary" onClick={Save_Cart_Data}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="row service-list">
            {product.services.map((service) => (
              <div className="col-6" key={service.id}>
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id={`service-${product.id}-${service.id}`}
                          checked={product.selectedServices.includes(service)}
                          onChange={() => onServiceToggle(product, service)}
                        />
                        <label
                          htmlFor={`service-${product.id}-${service.id}`}
                          className="ms-2"
                        >
                          {service.name}
                        </label>
                      </div>
                    </div>
                    <h6 className="mt-2">₹{service.price}</h6>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = (props) => {
  let [checkItem, setCheckItem] = useState([]);
  let [allProduct, setAllProducts] = useState([]);
  let [products, setProducts] = useState([]);
  let [categoryList, setCategoryList] = useState([]);
  const { cat } = useParams();
  SERVICE_API_URL = props.data.backendServiceURL || "";
  let url = cat
    ? SERVICE_API_URL + "/laundrino/getcategoryservice?categoryName=" + cat
    : SERVICE_API_URL + "/laundrino/getcategoryservice";
  const location = useLocation();  
  useEffect(() => {
    let service_url = url;
    axios.get(service_url).then((response) => {
      let res_data = response.data || "";
      let productList = [];
      if (res_data) {
        let category_details = res_data.categoryService || [];
        let product_details =
          category_details[0].productListWithServicePrice || [];
        let productData = [];
        for (let index = 0; index < product_details.length; index++) {
          let data = {
            price: 0,
            quantity: 1,
            selectedServices: [],
          };
          let service = [];
          let service_data = product_details[index] || "";
          data.id = index;
          data.title =
            (service_data.productName &&
              service_data.productName.toUpperCase()) ||
            "";
          data.rating = service_data.rating || 0;
          productList.push(data.title);
          data.imageAlt =
            (service_data.ImageURL && service_data.ImageURL[0].public_id) || "";
          data.imageUrl =
            (service_data.ImageURL && service_data.ImageURL[0].url) || "";
          let count = 1;
          for (let key in service_data.services) {
            if (key !== "_id") {
              let serviceJson = {
                id: count,
              };
              serviceJson.name = key.includes("_")
                ? key.replaceAll("_", " ")
                : key;
              serviceJson.price = service_data.services[key];
              service.push(serviceJson);
              count++;
            }
          }
          data.services = service;
          productData.push(data);
        }
        console.log(productData);
        setProducts(productData);
        setAllProducts(productData);
        setCategoryList(productList);
      }
    });
  }, [location.search]);

  const handleServiceToggle = (product, service) => {
    document.getElementById("finalresult").style.display = "block";
    service.category = product.title || "";
    service.imageUrl = product.imageUrl || "";
    service.imageAlt = product.imageAlt || "";
    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        if (p.id === product.id) {
          const selectedServices = p.selectedServices.includes(service)
            ? p.selectedServices.filter((s) => s.id !== service.id)
            : [...p.selectedServices, service];
          return { ...p, selectedServices };
        }
        return p;
      });
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  let selectedServices =
    products && products.flatMap((product) => product.selectedServices);
  const selectedServiceMap = new Map();
  selectedServices.forEach((service) => {
    selectedServiceMap.set(service.category, service);
  });
  allProduct.forEach((product) => {
    product.selectedServices = product.services.filter((service) => {
      return selectedServiceMap.has(service.category);
    });
  });
  console.log("selectedServices", selectedServices);
  // const handleRemoveService = (index) => {
  //   console.log(selectedServices);
  //   selectedServices = selectedServices.filter((_, i) => i !== index);
  //   console.log(selectedServices);
  // };
  const handleRemoveService = (index) => {
    const updatedSelectedServices = selectedServices.filter((_, i) => i !== index);
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        const updatedServices = product.selectedServices.filter(service => 
          updatedSelectedServices.some(selected => selected.id === service.id)
        );
        return { ...product, selectedServices: updatedServices };
      });
    });
    selectedServices = updatedSelectedServices;
    console.log(selectedServices)
  };

  const calculateFooterTotalPrice = () => {
    return products.reduce((total, product) => {
      const servicesPrice = product.selectedServices.reduce(
        (sum, service) => sum + service.price,
        0
      );
      return total + servicesPrice * product.quantity;
    }, 0);
  };

  const Save_Cart_Data = async () => {
    let total_price = calculateFooterTotalPrice() || 0;
    let productList = [];
    let productSet = [];
    for (let index = 1; index <= selectedServices.length; index++) {
      let service_data = selectedServices[index - 1];
      if (productSet.length > 0 && productSet.includes(service_data.category)) {
        let product_data = productList.filter(
          (product) => product.productName === service_data.category
        );
        let productJSON = product_data[0];
        productList = productList.filter(
          (product) => product.productName !== service_data.category
        );
        productJSON.noOfServiceSelected += 1;
        productJSON.serviceTotalPrice += service_data.price;
        productJSON.selectedServiceWithPriceValue[service_data.name] =
          service_data.price;
        productList.push(productJSON);
      } else {
        let product_details = {};
        let selectedServiceWithPriceValue = {};
        selectedServiceWithPriceValue[service_data.name] = service_data.price;
        product_details.productName = service_data.category;
        product_details.selectedServiceWithPriceValue =
          selectedServiceWithPriceValue;
        product_details.noOfServiceSelected = Object.keys(
          selectedServiceWithPriceValue
        ).length;
        product_details.images = [];
        let imgObj = {};
        imgObj.public_id = service_data.imageAlt;
        imgObj.url = service_data.imageUrl;
        product_details.images.push(imgObj);
        product_details.serviceTotalPrice = service_data.price;
        productList.push(product_details);
        productSet.push(service_data.category);
      }
    }
    if (iscartId) {
     let cart_url =
      SERVICE_API_URL + "/laundrino/get-card-details?id=" + iscartId;
      const response = await axios.get(cart_url, {
        headers: {
          Cookie:
            "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc1YTkwMGI3NDYxYzM1ODc3MjNmOCIsImlhdCI6MTcyMTMyMDk2OCwiZXhwIjoxNzIxNzUyOTY4fQ.STeFrCLx61f877oS7EaMS9j_A0RaZVJxzmDpn2O0WwY",
        },
      });
      let save_data = response.data.getCartDetails;
      save_data.serviceTotal += total_price;
      save_data.shippingCharge = save_data.serviceTotal >= 800 ? 0 : 80;
      save_data.subTotal = save_data.serviceTotal + save_data.shippingCharge;
    //  save_data.GST = save_data.subTotal * 0.18 || 0;
      save_data.grandTotal = save_data.subTotal //+ save_data.GST;
      productList.forEach((element) => {
        save_data.selectedProduct.push(element);
      });
      save_data.totalSelectedProduct += productList.length;
      await axios
        .put(cart_url, save_data)
        .then(function (response) {
          window.location.href = "/addtocart";
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      let save_data = {};
      save_data.serviceTotal = total_price;
      save_data.shippingCharge = total_price >= 800 ? 0 : 80;
      save_data.subTotal = save_data.serviceTotal + save_data.shippingCharge;
     // save_data.GST = save_data.subTotal * 0.18 || 0;
      save_data.grandTotal = save_data.subTotal // + save_data.GST;
      save_data.selectedProduct = productList;
      save_data.totalSelectedProduct = productList.length || 0;
      console.log(save_data);
      let save_data_url = SERVICE_API_URL + '/laundrino/addcartdetails/new'
      await axios
        .post(save_data_url, save_data)
        .then(function (response) {
          console.log(response);
          let cartId =
            (response &&
              response.data &&
              response.data.addCartDetails &&
              response.data.addCartDetails._id) ||
            "";
          localStorage.setItem("cartId", cartId);
          window.location.href = "/addtocart";
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  const handlerSearchChange = (event) => {
    const { value } = event.target;
    let products_data =
      value.length === 0
        ? allProduct
        : allProduct.filter((item) => {
            const regex = new RegExp(value, "i");
            return regex.test(item.title);
          });
    setProducts(products_data);
  };

  const handleProductChange = (event) => {
    const { value } = event.target;
    let item_check = checkItem;
    if (event.target.checked) {
      item_check.push(value);
    } else {
      item_check = item_check.filter((item) => item !== value);
    }
    let products_data =
      item_check.length === 0
        ? allProduct
        : allProduct.filter((item) =>
            item_check.includes(item.title.toUpperCase())
          );
    setProducts(products_data);
    setCheckItem(item_check);
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
  };

  return (
    <div>
      <section>
        <div className="banner-image d-flex justify-content-center align-items-center">
          <div className="content text-center serviceCont">
            <h5>
              Free Shipping Will Be Allowed Only Above ₹500/- Service Charged
            </h5>
            <h1>
              Laundry Service <b> Category</b>
            </h1>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3 col-md-6 serviceCategoryList">
            <h5>Product</h5>
            {categoryList &&
              categoryList.map((category) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={category}
                    onChange={handleProductChange}
                    id={category.toLowerCase()}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={category.toLowerCase()}
                  >
                    {category}
                  </label>
                </div>
              ))}

            <h5 className="mt-4">Category</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCategoryChange}
                value="Women"
                id="price1"
              />
              <label className="form-check-label" htmlFor="price1">
                WOMEN
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCategoryChange}
                value="Men"
                id="price2"
              />
              <label className="form-check-label" htmlFor="price2">
                MEN
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCategoryChange}
                value="Woolen"
                id="price3"
              />
              <label className="form-check-label" htmlFor="price3">
                WOOLEN
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCategoryChange}
                value="Household"
                id="price4"
              />
              <label className="form-check-label" htmlFor="price4">
                HOUSEHOLD
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCategoryChange}
                value="Accessories"
                id="price5"
              />
              <label className="form-check-label" htmlFor="price5">
                ACCESSORIES
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCategoryChange}
                value={"Kids"}
                id="price6"
              />
              <label className="form-check-label" htmlFor="price6">
                KIDS
              </label>
            </div>
          </div>

          <div className="col-lg-9 col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>{cat}</h2>
              <input
                className="form-control w-50"
                onChange={handlerSearchChange}
                type="text"
                placeholder="Search"
              />
            </div>

            <div className="row">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onServiceToggle={handleServiceToggle}
                  onQuantityChange={handleQuantityChange}
                  Save_Cart_Data={Save_Cart_Data}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer
        className="footer fixed-bottom stickyFooter"
        style={{ display: "none" }}
        id="finalresult"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                {selectedServices &&
                  selectedServices.length > 0 &&
                  selectedServices.map((service, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6"
                      key={service.id}
                    >
                      <div className="d-flex flex-column">
                        <button
                          className="btn btn-link close-btn align-items-end"
                          onClick={() => handleRemoveService(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                        <h6 className="service-title">{service.category}</h6>
                        <h6 className="service-title">{service.name}</h6>
                        <p className="service-price">₹{service.price}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-lg-3 totalPriceSec">
              <div className="total-price">
                Total Price: ₹{calculateFooterTotalPrice()}
              </div>
              <button
                className="btn btn-primary ml-3 ms-2"
                onClick={Save_Cart_Data}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Category;
