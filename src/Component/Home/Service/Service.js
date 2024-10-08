import React from "react";
import './Service.css'
import { Link } from "react-router-dom";
const services = [
  {
    title: "Dry Clean",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/dry_clean.png",
    rating: 5.0,
    link: "/service/dry_clean",
  },
  {
    title: "Roll Press",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/RollPress.png",
    rating: 4.0,
    link: "/service/roll_press",
  },
  {
    title: "Starch",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/starch.png",
    rating: 3.0,
    link: "/service/starch",
  },
  {
    title: "Dying",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/Dyeing.png",
    rating: 3.0,
    link: "/service/dyeing",
  },
  {
    title: "Petrol Wash",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/petrol_wash.png",
    rating: 4.0,
    link: "/service/petrol_wash",
  },
  {
    title: "Antiseptic Wash",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/Antiseptic.png",
    rating: 5.0,
    link: "/service/antiseptic_wash",
  },
  {
    title: "Fabric Softner",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/fabric_softner.png",
    rating: 3.0,
    link: "/service/fabric_softener",
  },
  {
    title: "Normal Iron",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/normal_Iron.png",
    rating: 4.0,
    link: "/service/normal_iron",
  },
  {
    title: "Steam Iron",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/Steam_Press.png",
    rating: 5.0,
    link: "/service/steam_iron",
  },
  {
    title: "Normal Wash & Fold",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/washandfold.png",
    rating: 3.0,
    link: "/service/wash_fold",
  },
  {
    title: "Normal Wash & Normal Iron",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/wash_and_iron.png",
    rating: 4.0,
    link: "/service/wash_iron",
  },
  {
    title: "Normal Wash & Steam Iron",
    image: "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Service_Images/wash_and_steam_press.png",
    rating: 5.0,
    link: "/service/wash_steam_iron",
  },
];


const ServiceSection = () => {
  return (
    <section className="serviceSection py-5 px-3 px-md-5">
  <h1 className="mt-2 text-center serviceName">Laundry Service</h1>
  <div className="row mt-5 serMargin">
    {services.map((service, index) => (
      <Link key={index} to={service.link} className="col-lg-3 mt-3 col-6 mb-4 mb-lg-0 ">
        {/* Card */}
        <div className="card rounded shadow-sm border-0 bg-image prod_detls">
          <div className="card-body p-0 pb-4">
            <img
              src={service.image}
              alt={service.title}
              className="img-fluid w-100 rounded-0"
            />
            <div className="p-3 imagetrans">
              <h5>
                <a href={service.link} className="text-dark">
                  {service.title}
                </a>
              </h5>
              <div className="d-flex align-items-center">
                <ul className="list-inline small mb-0">
                  {Array.from({ length: service.rating }, (_, i) => (
                    <li key={i} className="list-inline-item m-0">
                      <i className="fa fa-star text-warning"></i>
                    </li>
                  ))}
                </ul>
                <p className="mx-2 mb-0 font-weight-bold">{service.rating}</p>
              </div>
              <br />
              <a href={service.link} className="card-link" style={{color:"black"}}>
                View Product Details
              </a>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

  );
};

export default ServiceSection;
