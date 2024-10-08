import React from 'react';
import './Testimonial.css';
// import profile1 from '../../../assets/LaundriNo_Project/Home/close-up-classify-clothes.jpg';
// import logoline from '../../../assets/LaundriNo_Project/Home/Icon/Logo.png';
const Testimonial = () => {
  return (
    <>
      <section className="testimonial">
        <div className=" align-items-center text-center">
          <h2 className="font-weight-bold mb-2 text-center mt-5">What They Say About Us!</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <div className="profile">
                <img className="rounded-circle" src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Home/close-up-classify-clothes.jpg" />
                <div className="profile-info text-left">
                  <h4>John Doe</h4>
                  <p>CEO, Company</p>
                </div>
                <div className="rating">
                  ★★★★★
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <div className="profile">
                <img className="rounded-circle" src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Home/close-up-classify-clothes.jpg" />
                <div className="profile-info text-left">
                  <h4>John Doe</h4>
                  <p>CEO, Company</p>
                </div>
                <div className="rating">
                  ★★★★★
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <div className="profile">
                <img className="rounded-circle" src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Home/close-up-classify-clothes.jpg" />
                <div className="profile-info text-left">
                  <h4>John Doe</h4>
                  <p>CEO, Company</p>
                </div>
                <div className="rating">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Testimonial;
