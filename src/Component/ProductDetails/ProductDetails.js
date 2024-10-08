import React from 'react'
import './ProductDetails.css';
const ProductDetails = () => {
  return (
    <div class="detailscontainer">
    <h1 className='msg1'>Sorry for the Inconvenience</h1>
    <p className='msg2'>This page is still in development mode. In the meantime, you can select a service from the Service page or browse through the Category page as per your requirement.</p>
    <div class="productbuttons">
        <a className='serviceUrl' href="/productservice?service=DryClean">Service Page</a>
        <a className='serviceUrl' href="/productcategory?service=Women">Category Page</a>
        <a className="serviceUrl" href='/'>Home Page</a>
    </div>
</div>
  )
}

export default ProductDetails
