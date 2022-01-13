import React from 'react';
import { Link } from 'react-router-dom';
//components
import { Button } from 'antd';
//statics
import errorIcon from '../../assets/img/courses/error-404@2x.png';

const NotFound = () => (
  <div className='w-100 vh-70' style={{height: "70vh", paddingTop: "50px"}}>
    <div className='w-50 mx-auto my-5'>
      <div className='w-40 mx-auto py-4'>
        <img src={errorIcon} alt='CPD Ace' className='w-100' />
      </div>
      <p className='w-50 mx-auto text-center color-dark-grey-1 fs-20'>
        Oops! Page not found!
      </p>
      <Button
        type='link'
        className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mt-5 mx-auto'
      >
        <Link to='/'>
          <span className='fs-14 color-white'>Go back home</span>
        </Link>
      </Button>
    </div>
  </div>
);

export default NotFound;
