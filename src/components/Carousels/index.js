import React from 'react';

//components
import { Carousel } from 'antd';

//stylesheet
// import './Carousels.css';

export const Carousels = () => {
  const imgList = [
    'https://mk0thinkificig8baqk3.kinstacdn.com/wp-content/uploads/2016/06/Create-Online-Courses-10.jpg',
    'https://www.cpacanada.ca/-/media/site/legacy/round-1/images/31030.jpg',
    'https://www.gleim.com/wp-content/uploads/2018/01/012819_studying-during-busy-season_cpa_fb.jpg',
  ];

  return (
    <Carousel autoplay effect="fade">
      {imgList.map((img) => (
        <div key={img} className={'image-container'}>
          <img
            className="d-block w-100 h-100"
            src={img}
            alt='/'
          />
          <h1> Primary Title</h1>
          <div
            role="button"
            className="border border-white rounded-pill py-3 mt-1 w-100 rounded-pill button button--dark-hover-white button--animated"
            onClick={() => console.log('')}
          >
            <span className="fs-18">Navigation Button</span>
          </div>
        </div>
      ))}
    </Carousel>
  );
};