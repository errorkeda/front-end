import React from 'react';
import './Carousel.css';
const Carousel = () => {
  return (
    <>
      <div className="homePgCar">
          <div className="row">
            <div className="col-md-12">
              <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
                  <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
                  <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Home/woman-holding-laundry-basket-medium-shot.jpg" className="img-fluid" alt="Notebook" />
                    <div className="carousel-caption">
                      <h5>Professional Laundry Service</h5>
                      <h3>Laundry Service <b> Delivered To Your Door</b></h3>
                      <p>Pulvinar leo id risus pellentesque vestibulum. Sed diam libero, sodales eget cursus dolor.</p>
                      <div className="carousel-action">
                        <a href="#" className="btn  btn-primary carPriBtn">Pickup Now</a>
                        <a href="#" className="btn btn-success carSucBtn">Discover More <i className="fa fa-arrow-right"></i> </a>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Home/man-holding-pile-clean-clothes.jpg" className="img-fluid" alt="Tablet" />
                    <div className="carousel-caption">
                      <h5>Professional Laundry Service</h5>
                      <h3>Amazing Digital Experience</h3>
                      <p>Nullam hendrerit justo non leo aliquet imperdiet. Etiam sagittis lectus condime dapibus.</p>
                      <div className="carousel-action">
                        <a href="#" className="btn  btn-primary carPriBtn">Pickup Now</a>
                        <a href="#" className="btn btn-success carSucBtn">Discover More <i className="fa fa-arrow-right"></i> </a>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://laundrinoassets.s3.ap-south-1.amazonaws.com/LaundriNo_Project/Home/woman-ironing-her-husband-s-shirt.jpg" className="img-fluid" alt="Workstation" />
                    <div className="carousel-caption">
                      <h5>Professional Laundry Service</h5>
                      <h3>Live Monitoring Tools</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu pellentesque sem tempor.</p>
                      <div className="carousel-action">
                        <a href="#" className="btn  btn-primary carPriBtn">Pickup Now</a>
                        <a href="#" className="btn btn-success carSucBtn">Discover More <i className="fa fa-arrow-right"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
                </a>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Carousel
