import React from 'react';
import { Link } from 'react-router-dom';
import { srcURL } from "../../../configs/AppConfig";

import {

  FilePdfFilled,

} from "@ant-design/icons";
import { Row, Col } from 'antd';

const Attachment = ({ data }) => {
  const { CourseDoc } = data;
  return (
    <div className='section-card border-radius-8 bg-white mt-4 pb-20'>
      <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>Attachment</div>
      <div className='rectangle rectangle--light rectangle--small card-rectangle' />

      <div className='d-flex align-items-center justify-content-center'>
        <Row className='w-100'>
          {CourseDoc.map((item, index) => {
            return (
              <Col key={index} span={6} className='mb-5 cursor--pointer' onClick={() => window.open(item.ContentUrl)}>
                <span className='d-flex align-items-center justify-content-center  fs-40 panel-container color-light-grey-2 py-1'>
                  <FilePdfFilled />
                </span>
                <span className='d-flex align-items-center justify-content-center text-center fs-12 panel-container color-light-grey-2 py-1'>
                  {item.CourseContentTitle}
                </span>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default Attachment;
