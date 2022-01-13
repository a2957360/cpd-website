import React from 'react';
//components
import Carousel from 'react-elastic-carousel';
import { Divider } from 'antd';
import Ratings from '../../components/Ratings';
import { HistoryOutlined } from '@ant-design/icons';
import packageLabel from '../../assets/img/courses/PackageIcon.png';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 1 },
  { width: 992, itemsToShow: 3, itemsToScroll: 1 },
  { width: 1200, itemsToShow: 3, itemsToScroll: 1 },
];

const LeftArrow = ({ onClick }) => (
  <div
    role='button'
    onClick={onClick}
    className='arrow-wrapper d-flex align-items-center justify-content-center bg-light-theme'
  >
    <i className='fas fa-chevron-left color-white'></i>
  </div>
);

const RightArrow = ({ onClick }) => (
  <div
    role='button'
    onClick={onClick}
    className='arrow-wrapper d-flex align-items-center justify-content-center bg-light-theme'
  >
    <i className='fas fa-chevron-right color-white'></i>
  </div>
);

const Recomendations = (props) => {
  const { list, isPackage } = props;

  const addToCart = () => {
    console.log('add to cart');
  };

  return (
    <div className='mt-5 mx-auto dashboard-recommendation-wrapper'>
      <p className='color-dark-grey-2 fs-20'>Recommend for you</p>
      <div className='light-theme-line' />
      <Carousel
        breakPoints={breakPoints}
        // itemsToShow={3}
        // itemsToScroll={1}
        pagination={false}
        renderArrow={({ type, onClick }) => (
          <div className='d-flex align-items-center'>
            {type === 'PREV' ? (
              <LeftArrow onClick={onClick} />
            ) : (
              <RightArrow onClick={onClick} />
            )}
          </div>
        )}
        className='mt-4 py-3'
      >
        {list.map((item, index) => (
          <div key={index} className='recommendation-card'>
            <div className='recommendation-content-container'>
              {isPackage && (
                <img
                  src={packageLabel}
                  alt='CPD Ace'
                  className='package-label'
                />
              )}
              <img
                src={item.image}
                alt='CPD Ace'
                className='recommendation-cover'
              />
              <div className='d-flex flex-column justify-content-between flex-grow-1'>
                <div className='pt-4 px-4'>
                  <h2 className='color-dark-grey-2 fs-14 item-title line-height-25'>
                    {item.title}
                  </h2>

                  <div>
                    <span className='color-light-grey-2'>By </span>
                    <span className='color-light-theme'>{item.instructor}</span>
                  </div>

                  <div className='d-flex justify-content-between mt-2'>
                    <span>
                      <Ratings rate={item.rating} />
                      <span className='color-light-grey-2'>({item.RatingCount})</span>
                    </span>

                    <span className='d-flex align-items-center'>
                      <HistoryOutlined className='fs-16 color-light-theme mr-2' />
                      <span className='color-light-grey-2'>
                        {item.duration}h
                      </span>
                    </span>
                  </div>

                  <Divider dashed className='mx-0 my-3' />
                </div>
                <p className='px-4'>
                  {item.salePrice ? (
                    <span className='fs-20 color-orange fw-800'>
                      ${item.salePrice}{' '}
                      <span className='text-decoration-line-through fs-16 color-dark-grey-1'>
                        ${item.price}
                      </span>
                    </span>
                  ) : (
                    <span className='fs-20 color-dark-grey-1'>
                      ${item.price}
                    </span>
                  )}
                </p>
                <div
                  role='button'
                  className='rounded-pill m-auto w-90 button button--light-hover-dark button--animated'
                  onClick={() => addToCart()}
                >
                  <span className='fs-16'>Add to Cart</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Recomendations;
