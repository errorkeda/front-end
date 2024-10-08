import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If using Axios for API requests
import '../Component/My_Services.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [pending_orders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let response = {
                    "data":{
                        "COMPLETED_ORDERS":[],
                        "PENDING_ORDERS":[]
                    }
                }
                let order = {
                    "fullName": "Pawan Kumar Kanoagia",
                    "email": "pkanoagia@gmail.com",
                    "address": "tagor nagar Vikhroli east 6/4 rajkamal chawl ",
                    "mobileNo": "9869950233",
                    "state": "Mumbai",
                    "pinCode": "400083",
                    "cartId": "66fad730d544a07267d0f4ea",
                    "productServiceDetails": {
                        "_id": "66fad730d544a07267d0f4ea",
                        "serviceTotal": 1658,
                        "shippingCharge": 0,
                        "subTotal": 1658,
                        "GST": 298.44,
                        "grandTotal": 1956.44,
                        "totalSelectedProduct": 10,
                        "selectedProduct": [
                            {
                                "productName": "Kurti Heavy",
                                "images": [
                                    {
                                        "public_id": "kurti_heavy",
                                        "url": "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/PRODUCT_IMAGES_LIST/WOMEN/Kurit_Heavy.png"
                                    }
                                ],
                                "noOfServiceSelected": 1,
                                "serviceTotalPrice": 350,
                                "selectedServiceWithPriceValue": {
                                    "DryClean": 350
                                }
                            },
                            {
                                "productName": "Dress Long",
                                "images": [
                                    {
                                        "public_id": "dress_long",
                                        "url": "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/PRODUCT_IMAGES_LIST/WOMEN/Dress_Long.png"
                                    }
                                ],
                                "noOfServiceSelected": 1,
                                "serviceTotalPrice": 150,
                                "selectedServiceWithPriceValue": {
                                    "DryClean": 150
                                }
                            },
                            {
                                "productName": "KURTI NORMAL",
                                "images": [
                                    {
                                        "public_id": "kurti_normal",
                                        "url": "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/PRODUCT_IMAGES_LIST/WOMEN/Kurti_Normal.png"
                                    }
                                ],
                                "noOfServiceSelected": 2,
                                "serviceTotalPrice": 160,
                                "selectedServiceWithPriceValue": {
                                    "Petrol Wash": 80,
                                    "Fabric Softener": 80
                                }
                            },
                            {
                                "productName": "KURTI PLAIN",
                                "images": [
                                    {
                                        "public_id": "kurti_plain",
                                        "url": "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/PRODUCT_IMAGES_LIST/WOMEN/Kurti_Medium.png"
                                    }
                                ],
                                "noOfServiceSelected": 2,
                                "serviceTotalPrice": 400,
                                "selectedServiceWithPriceValue": {
                                    "Antiseptic Wash": 180,
                                    "Dyeing": 220
                                }
                            },
                            {
                                "productName": "KURTI HEAVY",
                                "images": [
                                    {
                                        "public_id": "kurti_heavy",
                                        "url": "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/PRODUCT_IMAGES_LIST/WOMEN/Kurit_Heavy.png"
                                    }
                                ],
                                "noOfServiceSelected": 2,
                                "serviceTotalPrice": 490,
                                "selectedServiceWithPriceValue": {
                                    "Fabric Softener": 340,
                                    "Steam Iron": 150
                                }
                            },
                            {
                                "productName": "DRESS SMALL",
                                "images": [
                                    {
                                        "public_id": "dress_small",
                                        "url": "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/PRODUCT_IMAGES_LIST/WOMEN/Dress_Long.png"
                                    }
                                ],
                                "noOfServiceSelected": 2,
                                "serviceTotalPrice": 108,
                                "selectedServiceWithPriceValue": {
                                    "Normal Iron": 8,
                                    "Antiseptic Wash": 100
                                }
                            }
                        ],
                        "__v": 0
                    },
                    "isShippingDetailsSame": true,
                    "shippingDetails": {
                        "address": "tagor nagar Vikhroli east 6/4 rajkamal chawl ",
                        "state": "Mumbai",
                        "pinCode": "400083",
                        "country": ""
                    },
                    "transactionStatus":"Success"
                };
                let order_id = order.cartId.slice(order.cartId.length-6).toUpperCase();
                const transformedOrder = {
                    id: order_id, // You can use order ID or any other unique identifier
                    items: order.productServiceDetails.selectedProduct.map(product => ({
                        name: Object.keys(product.selectedServiceWithPriceValue)[0],
                        quantity: product.noOfServiceSelected,
                        price: product.serviceTotalPrice,
                        src: product.images[0].url
                    }))
                };
                
                if (order.transactionStatus === "Pending") {
                    response.data.PENDING_ORDERS.push(transformedOrder);
                } else {
                    response.data.COMPLETED_ORDERS.push(transformedOrder);
                }
                setOrders(response.data.COMPLETED_ORDERS);
                setPendingOrders(response.data.PENDING_ORDERS);
            } catch (error) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {pending_orders.length === 0 ? (
                <p></p>
            ) : (
                <div className="orders-list">
                    {pending_orders.map(order => (
                        <OrderCard key={order.id} order={order} status="Pending Orders" />
                    ))}
                </div>
            )}
            {orders.length === 0 ? (
                <p></p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} status="Orders History" />
                    ))}
                </div>
            )}

        </div>
    );
};

const OrderCard = ({ order, status }) => {
    debugger;
    return (
        <div className="py-20 bg-light overflow-hidden" style={{ width: '100%' }}>
            <div className="container">
                <h2 className="mb-8">{status}</h2>
                <div className="order-card mb-12 py-8 px-8 px-md-20 bg-white">
                    <div className="d-flex flex-wrap border-bottom">
                        <div className="me-20">
                            <p className="mb-0 text-secondary">Order Number</p>
                            <p className="text-info fw-bold">{order.id}</p>
                        </div>
                    </div>
                    {order.items.map(item => (
                        <>
                        <OrderItem key={item.id} item={item} />
                        <hr key={item.id}/>
                        </>                        
                    ))}

                </div>
            </div>
        </div>
    );
};

const OrderItem = ({ item }) => {
    return (
        <div className="row align-items-center mb-8">
            <div className="col-12 col-lg-3 mb-8 mb-lg-3">
                <div className="d-flex align-items-center justify-content-center bg-light-light" style={{ height: '200px' }}>
                    <img
                        className="img-fluid"
                        style={{ height: '200px', objectFit: 'cover' }}
                        src={item.src}
                        alt={item.name}
                    />
                </div>
            </div>
            <div className="col-12 col-lg-9">
                <div className="mb-16 order-header">
                    <h3 className="lead fw-bold">Service</h3>
                    <h3 className="lead fw-bold">Quantity</h3>
                    <h3 className="lead fw-bold">Price</h3>
                    <span className="h5 text-info">Total</span>
                </div>
                <div className="mb-16 order-header">
                    <p className="mb-0 text-secondary">{item.name}</p>
                    <p className="mb-0 text-secondary">{item.quantity}</p>
                    <p className="text-secondary">₹{item.price.toFixed(2)}</p>
                    <span className="h5 text-info">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
