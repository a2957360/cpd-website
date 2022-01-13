import React, { useState } from 'react';
//components
import { Row, Col } from 'antd';

//statics
import logo1 from '../../../assets/img/courses/Circle (1).png';
import logo2 from '../../../assets/img/courses/Circle (2).png';
import logo3 from '../../../assets/img/courses/Circle (3).png';
import logo4 from '../../../assets/img/courses/Circle (4).png';
import logo5 from '../../../assets/img/courses/Circle (5).png';
import logo6 from '../../../assets/img/courses/Circle (6).png';

const HomeOurPartner = () => {
  const [logoList, setLogoList] = useState([
    { id: 0, image: logo4 },
    { id: 1, image: logo3 },
    { id: 2, image: logo2 },
    { id: 3, image: logo1 },
    { id: 4, image: logo6 },
    { id: 5, image: logo5 },
  ]);

  const rotateLogos = (index) => {
    console.log('rotate logos', index);
    if (index == 3) {
      return;
    } else {
      const temp = [...logoList.slice(0, index)];
      console.log(temp);
    }
    // e.target.parentElement.toggleClass("right-logo", "");
  };

  return (
    <div className='w-100 d-flex flex-column align-items-center home-partner-wrapper'>
      <div className='home-partner-title-wrapper'>
        <p className='color-black fs-50 text-center'>
          OUR <span className='color-light-theme'>PARTNER</span>
        </p>
        <p className='color-dark-grey-1 fs-20 text-center home-partner-subtitle'>
          
        </p>
      </div>
      <div className='w-60 home-partner-logo-container'>
        <Row align='bottom' className='logo-line-1'>
          {logoList.slice(0, 3).map((logo, index) => (
            <Col id={index} key={index} span={8}>
              <div
                className={`w-30 single-logo-container ${
                  index === 1 ? 'mb-4 opacity-1' : ''
                }`}
                role='button'
              >
                <img src={logo.image} alt='CPD Ace' />
              </div>
            </Col>
          ))}
        </Row>
        <Row align='top' className='logo-line-2'>
          {logoList.slice(3).map((logo, index) => (
            <Col id={index} key={index} span={8}>
              <div
                className={`single-logo-container ${
                  index === 1 ? 'active-logo' : ''
                }`}
                role='button'
              >
                <img
                  src={logo.image}
                  alt='CPD Ace'
                  width='100%'
                  height='100%'
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomeOurPartner;
