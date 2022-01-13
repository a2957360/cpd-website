import React, { useState, useEffect, useRef } from 'react';
//components
import { Row } from 'antd';

const HowToWords = (prop) => {
  const Enrollment = prop?.Enrollment??''
  const [ref, setRef] = useState(null);
  const componentObserver = useRef(null);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(Enrollment);
  const [className, setClassName] = useState('ENROLLMENT');
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
    if(prop?.Enrollment) {
      setContent(prop?.Enrollment);
    }
  }, [prop?.Enrollment]);

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

  const handleClick = (e, val) => {
    setClassName('');
    if(val === 'ENROLLMENT') {
      setClassName('ENROLLMENT');
      setContent(Enrollment);
    }else if(val === 'LEARNING') {
      setClassName('LEARNING');
      setContent(`Complete courses by watching educational CPD videos.`);
    }else if(val === 'ASSESSMENT') {
      setClassName('ASSESSMENT');
      setContent(`Evaluate your progress with quizzes and exams. `);
    }else if(val === 'PROGRESSION') {
      setClassName('PROGRESSION');
      setContent(`Use the interactive dashboard to track course completion.`);
    }else if(val === 'CERTIFIED') {
      setClassName('CERTIFIED');
      setContent(`Your CPD certificates appear on your dashboard. Certificates are fully audit-proof and stored for life.`);
    }
  }
  return (
    <div
      ref={setRef}
      className='w-100 vh-25 how-it-works-wrapper hide-on-mobile'
    >
      <div
        className={`mx-auto d-flex align-items-center justify-content-center position-relative ${
          visible ? 'how-it-works-animate' : ''
        }`}
      >
        <div
          className={`h-100 bg-light-theme how-it-works-cover ${
            visible ? 'cover-animate' : ''
          }`}
        />
        <div className={className==='ENROLLMENT'?'d-flex flex-column align-items-center item-wrapper active':'d-flex flex-column align-items-center item-wrapper'} onClick={(e)=>handleClick(e,'ENROLLMENT')}>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-sign-out-alt'></i>
          </div>
          <p className='color-dark-grey-2 fs-16 mt-3'>ENROLLMENT</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className={className==='LEARNING'?'d-flex flex-column align-items-center item-wrapper active': 'd-flex flex-column align-items-center item-wrapper'} onClick={(e)=>handleClick(e,'LEARNING')}> 
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-book-reader'></i>
          </div>
          <p className='color-dark-grey-2 fs-16 mt-3'>LEARNING</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className={className==='ASSESSMENT'?'d-flex flex-column align-items-center item-wrapper active':'d-flex flex-column align-items-center item-wrapper'} onClick={(e)=>handleClick(e,'ASSESSMENT')}>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-book-reader'></i>
          </div>
          <p className='color-dark-grey-2 fs-16 mt-3'>ASSESSMENT</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className={className==='PROGRESSION'?'d-flex flex-column align-items-center item-wrapper active': 'd-flex flex-column align-items-center item-wrapper'} onClick={(e)=>handleClick(e,'PROGRESSION')}>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-book-reader'></i>
          </div>
          <p className='color-dark-grey-2 fs-16 mt-3'>PROGRESSION</p>
        </div>

        <div className='how-it-works-bar bg-dark-theme' />

        <div className={className==='CERTIFIED'?'d-flex flex-column align-items-center item-wrapper active': 'd-flex flex-column align-items-center item-wrapper'} onClick={(e)=>handleClick(e, 'CERTIFIED')}>
          <div className='icon-wrapper d-flex align-items-center justify-content-center'>
            <i className='fas fa-sign-out-alt'></i>
          </div>
          <p className='color-dark-grey-2 fs-16 mt-3'>CERTIFIED</p>
        </div>
      </div>
      <div>
        <p
          className=' fs-16 color-light-grey-3 mt-30 w-100'
          style={{textAlign: 'center'}}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </div>
  );
};

export default HowToWords;
