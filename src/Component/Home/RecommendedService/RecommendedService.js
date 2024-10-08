import React from 'react'
import './RecommendedServices.css';
const RecommendedService = () => {
  return (
    <>
      <div className="container-fluid specSec">
  <h2 className="font-weight-bold mb-2 text-center mt-5">Recommended Speciality Services</h2>
  <div className="row specROw m-5">
    <div className="col-md-7 col-sm-12">
      <a href='/' className="row specRow img1">
        <div className="overlay d-flex flex-column justify-content-end align-items-start">
          <button className="btn btn-primary align-self-start" type="button">5% Off</button>
          <div className="mt-auto">
            <h2 className="text-white">₹3000</h2>
            <h3>This is some text in row 1.</h3>
            <p className="text-white">This is some text in row 1.</p>
          </div>
        </div>
      </a>
      <a href='/' className="row specRow mt-4 img2">
        <div className="overlay d-flex flex-column justify-content-end align-items-start">
          <button className="btn btn-primary align-self-start" type="button">10% Off</button>
          <div className="mt-auto">
            <h2 className="text-white">₹5000</h2>
            <h3>This is some text in row 1.</h3>
            <p className="text-white">This is some text in row 2.</p>
          </div>
        </div>
      </a>
    </div>
    <a href='/' className="col-md-5 col-sm-12 specColumn img3">
      <div className="overlay">
        <button className="btn btn-primary" type="button">20% Off</button>
        <h2 className="text-white offHead">Full Family Offer</h2>
        <h2 className="text-white offHead">₹10000</h2>
        <p className="text-white">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
      </div>
    </a>
  </div>
</div>
    </>
  )
}

export default RecommendedService
