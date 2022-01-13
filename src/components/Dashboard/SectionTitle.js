import React from 'react';
//components
import { Row, Col } from 'antd';

const SectionTitle = ({ title, section, data }) => {
  console.log(data)
  return (
    <Row
      justify='space-between'
      align='middle'
      className='w-100 dashboard-section-title-wrapper'
    >
      <div className='bg-dark-theme dashboard-section-title-container fw-400 fs-20 py-2 color-white text-center'>
        {title}
      </div>
      <div className='dashboard-section-title-info-container'>
        {section == 'time' && (
          <p className='color-light-grey-2 fs-15 pr-2 text-truncate mb-0'>
            You have completed{' '}
            <span className='color-light-theme'>{data} </span>
            courses
          </p>
        )}
        {section == 'event' && (
          <p className='color-light-grey-2 fs-15 pr-2 text-truncate mb-0'>
            {data == '' ? (
              <span>You have no register events</span>
            ) : (
              <span>
                You have an upcoming event on{' '}
                <span className='color-light-theme'>{data} </span>
              </span>
            )}
          </p>
        )}
      </div>
    </Row>
  );
};

export default SectionTitle;
