import React from "react";
//components
import { Row, Col, Carousel } from "antd";
// import HomeAboutUs from "../home/components/HomeAboutUs";
import ReactPlayer from 'react-player';
import { srcURL } from "../../configs/AppConfig";
import { useHistory } from "react-router-dom";
// import Carousel from 'react-elastic-carousel';
//statics
// import womanImage from "../../assets/img/courses/Woman.png";
// import manImage from "../../assets/img/courses/Man.png";
import aboutUs from "../../assets/img/about-us1.png";
import aboutUs2 from "../../assets/img/about-us2.png";
import aboutUs3 from "../../assets/img/about-us3.png";
import aboutUs4 from "../../assets/img/about-us4.png";
import aboutUs5 from "../../assets/img/about-us5.png"

const reviewList = [
  {
    id: 1,
    title: "On-demand courses",
    // name: "Lily Grace",
    reviewImage: aboutUs2,
    content:
      `<p>We provide courses designed to enhance your skills and ensure that you stay proficient as a CPA. </p>
      <p>CPD Ace courses comply with Canadian Provincial CPA regulations and policies.</p>
      <p>We offer verifiable certificate after course completion.</p>`
  },
  {
    id: 2,
    title: "Recommended Package",
    // name: "Bob",
    reviewImage: aboutUs3,
    content:
      `<p>Recommended packages are comprised with a broad range of features in mind: </p>
      <li>1. The goal of a recommended package is to enable users to purchase courses at a remarkably lower price than buying courses individually. </li>
      <li>2. Packages are tailored towards areas of specialization designed by our subject matter experts. </li>
      <li>3. Packages are curated with a fine balance of technical topics, leadership, and personal development.</li>`
  },
  {
    id: 3,
    title: "Customized Learning",
    // name: "Bob",
    reviewImage: aboutUs4,
    content:
      `<p>Receive 20 hours worth of credit to purchase any of the offerings across the CPD Ace course library. </p>
      <p>Courses are fully audit-proof, and we store your certifications for life.</p>`
  },
  {
    id: 4,
    title: "Live Webinars",
    // name: "Bob",
    reviewImage: aboutUs5,
    content:
      `<p>Opportunities to learn from hundreds of professional instructors and earn CPD credits remotely.</p>
      <p>Real time interaction with instructor and fellow attendees.</p>
      <p>Available starting in Dec 2020.</p>`
  },
];

const SingleReviewPC = ({ review, index }) => {
  return index % 2 === 0 ? (
    <Row key={review.id} className="home-customer-review-container mt-30">
      <div className="home-customer-review-cover-container">
        <img src={review.reviewImage} alt="CPD Ace" />
      </div>
      <div className="w-50 ml-5 fs-20 color-dark-grey-1">
        <p className="fs-30 color-dark-grey-2 fw-400">{review.title}</p>
        <p>{review.name}</p>
        <div className="home-customer-review-divider" />
        <p className="" dangerouslySetInnerHTML={{
          __html: review.content,
        }}/>
      </div>
    </Row>
  ) : (
    <Row
      align="bottom"
      justify="end"
      className="home-customer-review-container mt-30"
    >
      <div className="w-50 d-flex flex-column align-items-end justify-content-end pl-5 mr-5 fs-20 color-dark-grey-1 text-left">
        <p className="fs-30 color-dark-grey-2 fw-400">{review.title}</p>
        <p>{review.name}</p>
        <div className="home-customer-review-divider" />
        <p className="pl-5" dangerouslySetInnerHTML={{
          __html: review.content,
        }}/>
      </div>
      <div className="home-customer-review-cover-container">
        <img src={review.reviewImage} alt="CPD Ace" />
      </div>
    </Row>
  );
};

//components
const About = () => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-center">
    <div className="w-70">
      <div className="w-100 pt-100">
        {/* <HomeAboutUs /> */}
        <div className="" style={{display:"flex",flexDirection:"column"}}>
          <div className="home-review-container-mobile" style={{alignSelf:"center"}}>
            <div className="home-review-image-container w-80 mt-30" style={{marginLeft:"10%"}}>
              <img src={aboutUs} alt="CPD Ace" />
            </div>
            <div
              className="fs-20 color-dark-black mt-50"
              style={{textAlign: 'center'}}
            >
              <p className="fs-30 color-black fw-400">
                Welcome to CPD Ace and the<br/> professional learning community
              </p>
              <div className="home-customer-review-divider" />
              <p className="mt-30 color-dark-grey-3">
                We're so happy that you've joined us!<br/><br/>
                Let us start by telling you a little bit about our <b className="fw-300">Product</b> <br/> Offerings especially designed by industry leading professionals.
                <br/>
              </p>
            </div>
          </div>
          <div
            role="button"
            style={{marginLeft:"40%"}}
            className="w-20 rounded-pill button button--light-hover-dark button--animated pl-30 mt-50 pt-10 pb-10"
            onClick={() => history.push("/course/list")}
          >
            Learn More
          </div>
          
          <div className='w-100 home-about-video-wrapper mt-30 other-customer-review-wrapper pt-40 pb-40'>
            <div className='w-100 home-about-video-container'>
              <ReactPlayer
                className='m-auto video'
                controls={true}
                url={`${srcURL}/videos/promo.mp4`}
              />
            </div>
            <div className='home-about-block' />
          </div>
          
        </div>
        
        <div className="hide-on-mobile mt-50 mb-30 about-review" >
          {reviewList.map((review, index) => (
            <SingleReviewPC key={index} review={review} index={index} />
          ))}
        </div>

        <Carousel
          autoplay
          autoplaySpeed={5000}
          dots={false}
          className="hide-on-pc"
        >
          {reviewList.map((review, index) => (
            <div key={index}>
              <Row className="home-review-container-mobile">
                <Col span={10} className="home-review-image-container">
                  <img src={review.reviewImage} alt="CPD Ace" />
                </Col>
                <Col
                  span={13}
                  push={1}
                  className="fs-20 color-dark-grey-1 fw-400"
                >
                  <p className="fs-30 color-dark-grey-2 fw-600">
                    {review.title}
                  </p>
                  {/* <p>{review.name}</p> */}
                  <div className="home-customer-review-divider" />
                  <p className="w-80">{review.content}</p>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>

        <div className="" style={{display:"flex",flexDirection:"column"}}>
          <div className="home-review-container-mobile" style={{alignSelf:"center"}}>
            <div
              className="fs-20 color-dark-black mt-50"
              style={{textAlign: 'center'}}
            >
              <p className="fs-24 color-black ">
                In the coming years, we would love to be there for you into the 
              </p>
              <p className="fw-600 fs-24">world of Continuing Professional Development.</p>
              
              <p>CPD Ace - your best place to ace your CPA PDs.</p>
              <p className="mt-30">
                Best,
              </p>
              <p className="mb-30">CPD Ace team
              </p>
            </div>
            <div
              role="button"
              style={{marginLeft:"40%"}}
              className="w-30 rounded-pill button button--light-hover-dark button--animated pl-30 mt-50 pt-10 pb-10 mb-30"
              onClick={() => history.push("/order/credit")}
            >
              Order Now!
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
