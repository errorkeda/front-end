import React from 'react'
import Carousel from './Carousel/Carousel.js';
import Category from './Category/Category.js';
import Service from './Service/Service.js';
// import RecommendedService from './RecommendedService/RecommendedService.js';
// import Testimonial from './Testimonial/Testimonial.js';
import WebsiteDetails from './WebsiteDetails/WebsiteDetails.js';

const Home = () => {
  return (
    <div>
      <Carousel/>
      <Category/>
      <Service/>
      {/* <RecommendedService/> */}
      {/* <Testimonial/> */}
      <WebsiteDetails/>
    </div>
  )
}

export default Home
