// src/OrderSummary.js
import React from 'react';
import './Success.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Success = ({data}) => {
  const { fullName, email, address, mobileNo, state, pinCode, country, cartId, productServiceDetails, order_id } = data;
  const { serviceTotal, shippingCharge, subTotal, grandTotal, totalSelectedProduct, selectedProduct } = productServiceDetails;

  const exportPDF = () => {
    const content = document.getElementById('success-container');
    html2canvas(content, {
      logging: true,
      useCORS: true,
      scale: 2,
    }).then(canvas => {
      const pdf = new jsPDF({
        unit: 'mm',
        format: [200, 320] 
      });

      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 320;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft = heightLeft - pageHeight;
      pdf.save('Landrino_Invoice.pdf');
    });
  };
  return (
    <>
    <div className="success-container" id="success-container">
      <h1 className='heading-title'><i className="fas fa-check-circle"></i> Thank You for Your Purchase!</h1>
      <p className="title">Dear {fullName},</p>
      <p className="title">Thank you for choosing our services. Your order has been successfully placed and will be processed shortly. Below are the details of your order:</p>

      <div className="details">
        <h2>Order Summary</h2>
        <table>
          <tbody>
            <tr>
              <th>Order ID</th>
              <td>{order_id}</td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td>{fullName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{address}</td>
            </tr>
            <tr>
              <th>Mobile Number</th>
              <td>{mobileNo}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{state}</td>
            </tr>
            <tr>
              <th>Pin Code</th>
              <td>{pinCode}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{country}</td>
            </tr>
            <tr>
              <th>Cart ID</th>
              <td>{cartId}</td>
            </tr>
          </tbody>
        </table>

        <h2>Product/Service Details</h2>
        <table>
          <tbody>
            <tr>
              <th>Service Total</th>
              <td>₹{serviceTotal}</td>
            </tr>
            <tr>
              <th>Shipping Charge</th>
              <td>₹{shippingCharge}</td>
            </tr>
            <tr>
              <th>Sub Total</th>
              <td>₹{subTotal}</td>
            </tr>
            {/* <tr>
              <th>GST</th>
              <td>₹{GST}</td>
            </tr> */}
            <tr>
              <th>Grand Total</th>
              <td>₹{grandTotal}</td>
            </tr>
            <tr>
              <th>Total Selected Products</th>
              <td>{totalSelectedProduct}</td>
            </tr>
            {selectedProduct.map((product, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th>Product Name</th>
                  <td>{product.productName}</td>
                </tr>
                <tr>
                  <th>Number of Services Selected</th>
                  <td>{product.noOfServiceSelected}</td>
                </tr>
                <tr>
                  <th>Service Total Price</th>
                  <td>₹{product.serviceTotalPrice}</td>
                </tr>
                <tr>
                  <th>Selected Services with Price</th>
                  <td>
                    <ul>
                      {Object.entries(product.selectedServiceWithPriceValue).map(([service, price], idx) => (
                        <li key={idx}>{service.replace('_', ' ')}: ₹{price}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="title"><i className="fas fa-info-circle"></i> If you have any questions or need further assistance, please feel free to contact us at support@ourservice.com or call us at our customer care number.</p>
      <p className="title">Best Regards,<br />Your Company Name</p>
      <h2 style={{color:"#002D62"}}>LaundriNo</h2>
    </div>
    <div  style={{
    marginBottom: '50px',
    marginRight: '20px'
  }}>
      <button className="download-btn" onClick={exportPDF}>
        <i className="fas fa-download"></i> Download Invoice
      </button>
    </div>
    </>
  );
};

export default Success;
