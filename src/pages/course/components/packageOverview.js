import React from 'react';
import { Link } from 'react-router-dom';

const PackageOverview = (props) => {
  const { CourseDescription, LearnPoints } = props.data;
  console.log(props)

  return (
    <>
      {/* CourseDescription */}
      <div className='section-card section-card--animated border-radius-8 bg-white mt-4'>
        <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>Course Description</div>
        <div className='rectangle rectangle--light rectangle--small card-rectangle' />
        {/* <div className='color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30'>{overview}</div> */}
        
        <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30" dangerouslySetInnerHTML = {{ __html: CourseDescription }} />
      </div>
      {/* Take Away */}
      <div className='section-card section-card--animated border-radius-8 bg-white mt-4'>
        <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>Take Away</div>
        <div className='rectangle rectangle--light rectangle--small card-rectangle' />
        <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30" dangerouslySetInnerHTML = {{ __html: LearnPoints }} />
      </div>
    </>
  )
}

export default PackageOverview;
