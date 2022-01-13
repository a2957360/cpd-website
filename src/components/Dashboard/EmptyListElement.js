import React from 'react';
import sorryIcon from '../../assets/img/courses/sorry@2x.png';

const EmptyListElement = (props) => {
  const { line1, line2, btnTitle } = props;

  const handleClick = () => {
    console.log(btnTitle);
  };

  return (
    <div className='w-100 pt-4'>
      <div className='text-center m-auto fs-16 color-dark-grey-1'>
        <p>{line1}</p>
        <p className='w-80 mx-auto'>{line2}</p>
        <img src={sorryIcon} alt='CPD Ace' className='w-30 my-5' />
        {/* <div
          role='button'
          className='w-30 m-auto rounded-pill button button--light-hover-dark button--animated mb-3 px-2'
          onClick={() => handleClick()}
        >
          <span className='fs-14'>{btnTitle}</span>
        </div> */}
      </div>
    </div>
  );
};

export default EmptyListElement;
