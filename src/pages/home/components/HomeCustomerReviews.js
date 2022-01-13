import React from 'react';
//components
import { Row, Col, Carousel } from 'antd';
import HomeAboutUs from './HomeAboutUs';
// import Carousel from 'react-elastic-carousel';
//statics
import image1 from '../../../assets/img/home/Home_Page_Review_Image_1.png';
import image2 from '../../../assets/img/home/Home_Page_Review_Image_2.png';

const images = [
  image1,
  image2,
];
const SingleReviewPC = ({ review, index }) => {
  const domain = "/Image";

  return index % 2 === 0 ? (
    <Row key={review.id} className='home-customer-review-container'>
      <div className='home-customer-review-cover-container'>
        <img src={images[index]} alt='CPD Ace' />
      </div>
      <div className='w-50 ml-5 fs-20 color-dark-grey-1 fw-400'>
        <p className='fs-26 color-dark-grey-2 fw-600'>{review.Title}</p>
        <p>{review.Author}</p>
        <div className='home-customer-review-divider' />
        <p className='w-80 fs-16'>{review.Content}</p>
      </div>
    </Row>
  ) : (
    <Row
      align='bottom'
      justify='end'
      className='home-customer-review-container'
    >
      <div className='w-40 d-flex flex-column align-items-end justify-content-end pl-5 mr-5 fs-20 color-dark-grey-1 fw-400 text-right'>
        <p className='fs-26 color-dark-grey-2 fw-600'>{review.Title}</p>
        <p>{review.Author}</p>
        <div className='home-customer-review-divider' />
        <p className='pl-5 fs-16'>{review.Content}</p>
      </div>
      <div className='home-customer-review-cover-container'>
        <img src={images[index]} alt='CPD Ace' />
      </div>
    </Row>
  );
};

const HomeCustomerReviews = (props) => {
  return (
    <div className='home-customer-review-wrapper'>
      <div className='w-100 my-5'>
        <div className='home-customer-review-title-wrapper'>
          <p className='fs-50 fw-800'>
            CUSTOMER <span className='color-light-theme'>REVIEWS</span>
          </p>
          <p className='fs-20 color-dark-grey-1 home-customer-review-subtitle'>
            Our customers praise us for our personable service and great value. Here are what they had to say:
          </p>
        </div>
        <div className='hide-on-mobile'>
          {props.reviewlList?.map((review, index) => (
            <SingleReviewPC key={index} review={review} index={index} />
          ))}
        </div>

        <Carousel
          autoplay
          autoplaySpeed={5000}
          dots={false}
          className='hide-on-pc'
        >
          {props.reviewlList?.map((review, index) => (
            <div key={index}>
              <Row className='home-review-container-mobile'>
                <Col span={10} className='home-review-image-container'>
                  <img src={review.reviewImage} alt='CPD Ace' />
                </Col>
                <Col
                  span={13}
                  push={1}
                  className='fs-20 color-dark-grey-1 fw-400'
                >
                  <p className='fs-26 color-dark-grey-2 fw-600'>
                    {review.Title}
                  </p>
                  <p>{review.Author}</p>
                  <div className='home-customer-review-divider' />
                  <p className='w-80 fs-16'>{review.Content}</p>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>
      </div>
      <HomeAboutUs />
    </div>
  );
};

export default HomeCustomerReviews;
