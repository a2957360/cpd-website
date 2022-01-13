import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import certificateImg from '../../../assets/img/img-certificate.png';
import { srcURL } from "../../../configs/AppConfig";

const Certificate = ({url}) => {
  let imgurl = url.split(".")[0]+".bmp";
  const dispatch = useDispatch();
  // const { courseReceview } = useSelector((state) => state.courseData);

  // useEffect(() => {
  //   dispatch()
  // }, [])
  return (
    <div className='section-card border-radius-8 bg-white mt-4'>
      <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>Certificate</div>

      <div className='d-flex align-items-center justify-content-center color-light-grey-3 fs-16 mx-5 mt-3 mb-3 line-height-30'>
        Congratulations on completing this course. Now you can download your certificate.
      </div>
      <div className="d-flex align-items-end justify-content-center mt-20 mb-40">
        <div
          role="button"
          className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
          onClick={() => window.open(srcURL+url)}
        >
          Download Certificate
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        {url && <img className='w-60' src={srcURL+imgurl} alt="/" />}
      </div>


    </div>
  )
}

export default Certificate;
