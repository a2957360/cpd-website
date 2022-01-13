import React, { useState } from 'react';
//packages
import { useHistory } from 'react-router-dom';
//components
import { Row, Col, Carousel } from 'antd';
import InstructorForm from '../../components/Form/InstructorForm';
import PageHeader from '../../components/PageHeader';
//statics
import icon1 from "../../assets/img/instructor-banner1.png";
import icon2 from "../../assets/img/instructor-banner2.png";
import icon3 from "../../assets/img/instructor-banner3.png";
// import icon4 from "../../assets/img/icon-certificate-4.png";

const feature = [
  {
    img: "fa fa-wifi fa-6x color-light-theme",
    title: "Expand Your Reach",
    text: "Teaching provides another way to network and reach new audiences.",
  },
  {
    img: "fa fa-handshake-o fa-6x color-light-theme",
    title: "Inspire Other Professionals",
    text: "Help other professionals learn new skills, advance their careers, and inspire them to achieve success.",
  },
  {
    img: "fa fa-btc fa-6x color-light-theme",
    title: "Earn Money",
    text: "Earn money every time a student purchases your course. Get paid monthly through Stripe.",
  },
];
const banner = {
  title: 'CPD ACE',
  subtitle: 'Your Courses, Our Success',
  text: 'Create an online video course and earn money by teaching corporate professionals around the world',
  button: 'Become An Instructor',
};

const Instructor = () => {
  const history = useHistory();

  const hanldeClick = () => {
    history.push('/resource/become-an-instructor/application');
  };

  return (
    <>
    <div className='vh-65 bg-image bg-image--instructor d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column justify-content-center max-w-90 align-items-center pb-200'>
        <h3 className='color-white text-center fs-40 mb-3 mt-20'>{banner.title}</h3>

        <h4 className='color-white text-center fs-30 mb-3'>
          {banner.subtitle}
        </h4>

        <span className='color-white text-center w-70 fs-20 mb-5'>
          {banner.text}
        </span>

        <div
          role='button'
          className='rounded-pill button button--light-hover-dark button--animated pl-30 pr-30 pt-10 pb-10 mb-30'
          onClick={hanldeClick}
        >
          {banner.button}
        </div>
      </div>
    </div>
    <div className="d-flex justify-content-center certificate-feature">
      <Row className="feature-container">
        {feature.map((item, index) => {
          return (
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={8}
              key={index}
              className="d-flex flex-column align-items-center feature-item"
            >
              <i className={item.img}/>

              <span className="color-dark-grey-2 text-center w-80 fs-22 mb-2">
                {item.title}
              </span>

              <span className="color-light-grey-2 text-center w-70 fs-18">
                {item.text}
              </span>
            </Col>
          );
        })}
      </Row>
    </div>
    <div className="w-100 color-white mb-30" style={{height: '100px',backgroundColor: '#3dafbe',textAlign: 'center'}}><p className="fs-28" style={{lineHeight: '100px'}}>Become an instructor</p></div>
    <Carousel autoplay className="mb-50 carousel-box" style={{width:'800px',margin: '0 auto',color:'black'}}>
      <div className="banner-box">
        <img className="certificate-banner" src={icon1} alt="/" />
        <h4 className="fs-20 mt-30">Conncet with us</h4>
        <p className="fs-16 color-light-theme mb-30">Help us help you</p>
        <p className="color-light-grey-3 fs-16">Learn about our partnership agreement, payment <br/>and logistics, and other educators.</p>
      </div>
      <div className="banner-box">
        <img className="certificate-banner" src={icon2} alt="/" />
        <h4 className="fs-20 mt-30">Design your courses</h4>
        <p className="fs-16 color-light-theme mb-30">Choose your topic and record</p>
        <p className="color-light-grey-3 fs-16">Use your passion and expertise to create great course content. 
          Create <br/>slides, video lectures, and quizzes to facilitate learning.
        </p>
      </div>
      <div className="banner-box">
        <img className="certificate-banner" src={icon3} alt="/" />
        <h4 className="fs-20 mt-30">Setup your Channel</h4>
        <p className="fs-16 color-light-theme mb-30">Build community</p>
        <p className="color-light-grey-3 fs-16">
        We upload your videos and materials to help build your <br/>personalized channel in our learning community.
        </p>
      </div>
    </Carousel>
  </>
  );
};

export default Instructor;
