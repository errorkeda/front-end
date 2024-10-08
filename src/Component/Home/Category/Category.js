import React, {useState, useEffect} from "react";
import "./Category.css";
import { Link } from "react-router-dom";
const categories = [
  {
    title: "Men",
    imgSrc:
      "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Category/Men_Pic.png",
    alt: "Men",
    link: '/category/Men'
  },
  {
    title: "Women",
    imgSrc:
      'https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Category/women_pic.png',
    alt: "Women",
    link: '/category/Women'
  },
  {
    title: "Woolen",
    imgSrc:
      "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Category/Woolen_Pic.png",
    alt: "Woolen",
    link: '/category/Woolen'
  },
  {
    title: "Household",
    imgSrc:
      "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Category/Household_pic.png",
    alt: "Household",
    link: '/category/Household'
  },
  {
    title: "Accessories",
    imgSrc:
      "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Category/Accessories_Pic.png",
    alt: "Accessories",
    link: '/category/Accessories'
  },
  {
    title: "Kids",
    imgSrc:
      "https://laundrinoassets.s3.ap-south-1.amazonaws.com/PRODUCT_IMAGES/Category/Kids_Pic.png",
    alt: "Kids",
    link: '/category/Kids'
  },
];
const Category = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <section className="white-section categorybg" id="features">
      <h2 className='titleName'>Laundry Category</h2>
        <div className="container-fluid">
          <div className="row flex-row flex-nowrap overflow-auto">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className={isMobile? 'feature-box col-lg-2 col-5' :'feature-box col-lg-2 col-3'}>
              <img className="image" src={category.imgSrc} alt={category.alt} />
                <h3 className="feature-title">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Category
