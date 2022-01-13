import React,{useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Row, Col } from 'antd';
import { srcURL } from "../../../configs/AppConfig";

//statics
import aboutImage from '../../../assets/img/home/Home_Page_About_Us.png';

import { useHistory } from "react-router-dom";

const HomeAboutUs = () => {
  const domain = "/Image";

  const history = useHistory();
  const handleToAboutUs = () => {
    history.push("/blog/detail/about-us?id=6")
  }

  const ref = useRef()
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    var intersectionObserver = new IntersectionObserver(
      function (entries) {
        // 如果不可见，就返回
        if (entries[0].intersectionRatio <= 0) {
          setPlaying(false)
        }else {
          setPlaying(true)
        }
        // loadItems(10);
        
        console.log('Loaded new items');
      });
    
    // 开始观察
    intersectionObserver.observe(
      document.getElementById("home_video")
    );
    // const observer = new IntersectionObserver(
    //   (entry, observe) => {
    //     // setplaying(true);
    //     console.log(entry)
    //     console.log(observe)
    //     if(entry) {
    //       console.log('entry')
    //       setplaying(true);
    //     }
    //   },
    //   {
    //     threshold: [1], // 触发回调的节点，0表示元素刚完全不可见，1表示元素刚完全可见，0.5表示元素可见了一半等
    //   },
    // )
    // // var intersectionObserver = new IntersectionObserver(function(entries) {
    // //   // If intersectionRatio is 0, the target is out of view
    // //   // and we do not need to do anything.
    // //   console.log(entries)
    // //   if (entries[0].intersectionRatio <= 0) return;
    
    // //   // loadItems(10);
    // //   console.log('Loaded new items');
    // // });
    // // console.log(intersectionObserver)
    // observer.observe(document.getElementById("home_video"))
    // return () => {
    //   observer.disconnect()
    // }
  }, [])
  return (
    <div className='home-about-wrapper w-100'>
      <div className='home-about-wrapper hide-on-mobile'>
        <Row className='w-100'>
          <Col span={10}>
            <p className='color-white fs-50 fw-300'>
              <span className='color-dark-theme fw-600'>ABOUT</span> US
            </p>
            <p className='color-white fs-20 fw-300'>
              On-demand courses:
              We provide courses designed to enhance your skills and ensure that you stay proficient as a CPA.
              CPD Ace courses comply with Canadian Provincial CPA regulations and policies.
              We offer verifiable certificate after course completion.
            </p>
            <div
              role="button"
              className="rounded-pill button button--dark-hover-white button--animated pl-30 pr- mt-100 pt-10 pb-10"
              onClick={(e) => handleToAboutUs(e)}
            >
              Learn More
            </div>
          </Col>
          <Col span={14} className='home-about-elements-container'>
            <div className='home-about-block' />
            <img src={aboutImage} alt='CPD Ace' className='home-about-image' />
          </Col>
        </Row>
        <div className='w-100 home-about-video-wrapper' id='homeAboutVideo'>
          <div className='w-100 home-about-video-container'>
            <ReactPlayer
              id="home_video"
              ref={ref}
              muted
              className='m-auto video'
              controls={true}
              url={`${srcURL}/videos/promo.mp4`}
              playing={playing}
            />
          </div>
          <div className='home-about-block' />
        </div>
      </div>

      {/* <div className='home-about-wrapper-mobile hide-on-pc'>
        <Row className='w-100'>
          <Col span={15}>
            <p className='color-white fs-50 fw-300'>
              <span className='color-dark-theme fw-600'>ABOUT</span> US
            </p>
            <p className='color-white fs-20 fw-300'>
              On-demand courses:
              We provide courses designed to enhance your skills and ensure that you stay proficient as a CPA.
              CPD Ace courses comply with Canadian Provincial CPA regulations and policies.
              We offer verifiable certificate after course completion.
            </p>

          </Col>
          <Col span={9} className='home-about-elements-container'>
            <img src={domain + "/Home_Page_About_Us.png"} alt='CPD Ace' className='home-about-image' />
          </Col>
        </Row>
        <div className='home-about-video-container'>
          <ReactPlayer
            id="home_video"
            className='m-auto video'
            controls={true}
            height='60%'
            playing={playing}
            url={`${srcURL}/videos/promo.mp4`}
          />
        </div>
        <div className='home-about-block' />
      </div> */}

    </div>
  );
};

export default HomeAboutUs;
