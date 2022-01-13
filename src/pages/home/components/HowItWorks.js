import React, { useState, useEffect, useRef } from 'react';
//components
import { Row } from 'antd';

const HowItWorks = () => {
  const [ref, setRef] = useState(null);
  const componentObserver = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ref) {
      // Our ref has a value, pointing to an HTML element
      // The perfect time to observe it.
    }

    return () => {
      if (ref) {
        // We need to clean up after this ref
        // The perfect time to unobserve it.
      }
    };
  }, [ref]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log('enter');
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    componentObserver.current = observer;
  }, []);

  useEffect(() => {
    const observer = componentObserver.current;
    if (ref) {
      observer.observe(ref);
    }
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  return (
    <div
      ref={setRef}
      className='w-100 vh-25 how-it-works-wrapper hide-on-mobile'
    >
      <div
        className={`mx-auto d-flex align-items-center justify-content-end position-relative ${
          visible ? 'how-it-works-animate' : ''
        }`}
      >
        <div
          className={`h-100 bg-light-theme how-it-works-cover ${
            visible ? 'cover-animate' : ''
          }`}
        />
        <div className='d-flex flex-column align-items-center item-wrapper'>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-sign-out-alt'></i>
          </div>
          <p className='color-white fs-25 mt-3'>ENROLLMENT</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className='d-flex flex-column align-items-center item-wrapper'>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-book-reader'></i>
          </div>
          <p className='color-white fs-25 mt-3'>LEARNING</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className='d-flex flex-column align-items-center item-wrapper'>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-book-reader'></i>
          </div>
          <p className='color-white fs-25 mt-3'>ASSESSMENT</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className='d-flex flex-column align-items-center item-wrapper'>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-book-reader'></i>
          </div>
          <p className='color-white fs-25 mt-3'>PROGRESSION</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className='d-flex flex-column align-items-center item-wrapper'>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-sign-out-alt'></i>
          </div>
          <p className='color-white fs-25 mt-3'>CERTIFIED</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
