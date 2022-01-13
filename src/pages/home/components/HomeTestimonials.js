import React, { useRef } from 'react';
//components
import { Row, Col, Carousel } from 'antd';
import TesterminalCoursePreview from '../../../components/Home/TesterminalCoursePreview';
//statics
import logo1 from '../../../assets/img/home/Home_Page_Testimonial_Logo_Image_1.png';
import logo2 from '../../../assets/img/home/Home_Page_Testimonial_Logo_Image_2.png';
import logo3 from '../../../assets/img/home/Home_Page_Testimonial_Logo_Image_3.png';
import logo4 from '../../../assets/img/home/Home_Page_Testimonial_Logo_Image_4.png';

import course_img1 from '../../../assets/img/home/Home_Page_Testimonial_Logo_Image_1.png';
import course_img2 from '../../../assets/img/courses/Course (2).jpg';
import course_img3 from '../../../assets/img/courses/Package.jpg';

const logos = [
  { id: 0, image: logo1 },
  { id: 1, image: logo2 },
  { id: 2, image: logo3 },
  { id: 3, image: logo4 },
];

const HomeTestimonials = (props) => {
  const domain = "/Image";
  const car = useRef();
  const go = (i) => {
    car.current.goTo(i)
  }
  return (
    <div className='w-100 home-testimonial-wrapper'>
      <div className='w-100 home-testimonial-title-wrapper'>
        <div className='home-testimonial-title-container'>
          <p className='fs-50 text-right'>
            OUR <span className='color-light-theme'>TESTIMONIALS</span>
          </p>
          <p className='fs-20 home-testimonials-subtitle color-dark-grey-1 text-right'>
            Learn about how CPD Ace courses have provided value to our clients
          </p>
        </div>
      </div>
      <Row align='middle' justify='space-between' className='w-60 py-5 mt-5'>
        {logos.map((logo) => (
          <Col
            key={logo.id}
            xs={12}
            lg={6}
            onClick={() => go(logo.id)}
            className='home-testimonials-logo-container d-flex justify-content-center align-items-center mb-3'
          >
            <img src={logo.image} alt='CPD Ace' />
          </Col>
        ))}
      </Row>
      <div className='home-single-testimonial-wrapper mb-5'>
        <Carousel ref={car} autoplay dots={false} className='w-100'>
          {props.testimonialList?.map((testimonial, index) => {
            return (
              <div key={testimonial.id} className='w-100 d-flex'>
                <Col span={2} className='pl-1'>
                  <i className='fas fa-quote-left color-dark-grey-1 fs-50'></i>
                </Col>
                <Col
                  lg={7}
                  xs={9}
                  sm={9}
                  className='home-testimonials-course-container mt-5 border-radius-8'
                >
                  <TesterminalCoursePreview srcUrl={true} courseId={testimonial.CourseID} index={index} />
                </Col>
                <Col lg={10} xs={9} sm={9} push={1} className='ml-4 mt-5'>
                  <div className='w-100'>
                    <p className='fs-26 fw-600 color-dark-grey-2'>
                      {testimonial.Title}
                    </p>
                    <p className='fs-20'>
                      {testimonial.Author}
                    </p>
                    <div className='home-testimonials-bar' />

                    <p className='fs-16' dangerouslySetInnerHTML={{ __html: testimonial.Content }}></p>
                  </div>
                </Col>
                <Col
                  span={2}
                  push={1}
                  className='d-flex justify-content-center align-items-center'
                >
                  <i className='fas fa-quote-right color-dark-grey-1 fs-50'></i>
                </Col>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default HomeTestimonials;
