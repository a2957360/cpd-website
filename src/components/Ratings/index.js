import React from 'react';

const Ratings = ({ rate }) => {
  const rateNum = Number(rate);
  if (rateNum > 0 && rateNum < 1) {
    return <i className='fs-14 fas fa-star-half-alt color-yellow mr-2'></i>;
  } else if (rateNum == 1) {
    return <i className='fs-14 fas fa-star color-yellow mr-2'></i>;
  } else if (rateNum > 1 && rateNum < 2) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star-half-alt color-yellow mr-2'></i>
      </>
    );
  } else if (rateNum == 2) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow mr-2'></i>
      </>
    );
  } else if (rateNum > 2 && rateNum < 3) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star-half-alt color-yellow mr-2'></i>
      </>
    );
  } else if (rateNum == 3) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow mr-2'></i>
      </>
    );
  } else if (rateNum > 3 && rateNum < 4) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star-half-alt color-yellow mr-2'></i>
      </>
    );
  } else if (rateNum == 4) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow mr-2'></i>
      </>
    );
  } else if (rateNum > 4 && rateNum < 5) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star-half-alt color-yellow mr-2'></i>
      </>
    );
  } else if (rateNum == 5) {
    return (
      <>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow'></i>
        <i className='fs-14 fas fa-star color-yellow mr-2'></i>
      </>
    );
  } else {
    return <i className='far fa-star mr-2'></i>;
  }
};

export default Ratings;
