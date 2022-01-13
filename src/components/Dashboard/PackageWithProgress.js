import React from 'react';
import { useHistory } from 'react-router-dom';
//components
import Ratings from '../../components/Ratings';
import { Divider, Row, Rate } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import packageLabel from '../../assets/img/courses/PackageIcon.png';

const PackageWithProgress = ({ pkg, btnTitle }) => {
  const history = useHistory();

  return (
    <div
      key={pkg.id}
      className='d-flex flex-column item-container position-relative'
      onClick={() => {
        history.push({
          pathname: `/course/detail/${pkg.title}`,
          search: `?id=${pkg.id}`,
          state: { data: pkg },
        })
        const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
        const resetCourse = recent.filter((item) => item.CourseID === pkg.CourseID);
        if (resetCourse.length === 0) {
          const recentList = [...recent, pkg];
          localStorage.setItem("recentView", JSON.stringify(recentList));
        }
      }}
    >
      <img src={packageLabel} alt='CPD Ace' className='item-cover-label' />
      <img src={pkg.image} alt='/' className='item-cover-image' />

      <div className='item-content-container p-3'>
        <p className='color-dark-grey-2 fs-14 item-title line-height-20 mb-0'>
          {pkg.title}
        </p>
        {
          pkg.instructor &&
          <div>
            <span className='color-light-grey-2  line-height-20'>By </span>
            <span className='color-light-theme  line-height-20'>
              {pkg.instructor}
            </span>
          </div>
        }

        <div className='d-flex justify-content-between mt-2'>
          {
            pkg.RatingCount !== 0 &&
            <span>
              <Rate className="fs-16 mr-2" allowHalf disabled value={pkg.RatingCountDecimal} />
              {/* <span className='color-light-grey-2'>({pkg.RatingCount})</span> */}
            </span>
          }

          <span className='d-flex align-items-center'>
            <HistoryOutlined className='fs-16 color-light-theme mr-2' />
            <span className='color-light-grey-2'>{pkg.duration}h</span>
          </span>
        </div>
        <Divider dashed className='mx-0 my-3' />
      </div>

      <div className='w-100 item-action-container px-3'>
        <Row justify='space-between' className='color-light-grey-2 px-2 justify-content-center'>
          {/* <span>3h25min Remain</span>
          <span>{pkg.progress}</span> */}
          <span className="color-dark-theme">{pkg.progress + "%"}</span>
        </Row>
        <div className='position-relative progress-bar-container w-100'>
          <div className='progress-bar' style={{ width: pkg.progress }} />
        </div>
        <div
          role='button'
          className='rounded-pill button button--light-hover-dark button--animated item-button'
        >
          <span className='fs-14'>{btnTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default PackageWithProgress;
