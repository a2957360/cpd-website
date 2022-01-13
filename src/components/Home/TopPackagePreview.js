import React from 'react';
//packages
import { useHistory } from 'react-router-dom';
//components
import { Row } from 'antd';
//statics
import packageLabel from '../../assets/img/courses/PackageIcon.png';
import { srcURL } from '../../configs/AppConfig';

import package1 from '../../assets/img/home/Home_Page_Package_Image_1.png';
import package2 from '../../assets/img/home/Home_Page_Package_Image_2.png';
import package3 from '../../assets/img/home/Home_Page_Package_Image_3.png';

const images = [
  package1,
  package2,
  package3,
];

const SinglePackagePreview = ({ coursePackage,index }) => {
  const domain = "/Image";

  const history = useHistory();
  const toPackageDetail = (e) => {
    e.stopPropagation();
    history.push({
      // /detail-mypackage/:id
      pathname: `/package/detail/${coursePackage.CourseTitle}`,
      search: `?id=${coursePackage.CourseID}`,
      state: {data: coursePackage}
    })
  }
  return (
    <div className='home-top-package-container mx-auto position-relative'>
      <img src={packageLabel} alt='CPD Ace' className='package-label' />
      <img
        src={`${images[index]}`}
        alt='CPD Ace'
        className='home-top-package-cover'
      />
      <div className='home-feature-package-content p-4 text-left'>
        <Row className='w-100'>
          <p className='w-90 p-lines p-lines-2-lh-25 fs-20 fw-600 mb-0'>
            {coursePackage.CourseName}
          </p>
        </Row>
        {/* <Row className='fs-14 fw-300 w-100 mb-2'>
          By {coursePackage.AuthorName}
        </Row> */}
        <Row className='w-100'>
          <div
            className='home-course-description-wrapper'
            dangerouslySetInnerHTML={{
              __html: coursePackage.CourseDescription,
            }}
          />
          {/*         
          <p className='p-lines p-lines-3-lh-25 fw-normal mb-0'>
            {coursePackage.CourseDescription}
          </p> */}
        </Row>
        <Row
          justify='space-between'
          align='middle'
          className='w-100 fs-20 fw-300 pt-2'
        >
          <span role='button' onClick={(e) => toPackageDetail(e)}
          >
            <u>Learn More</u>
          </span>
          <Row align='bottom'>
            {coursePackage.CoursePrice && (
              <span className='mr-2'>${coursePackage.CoursePrice}</span>
            )}
            <span
              className={
                coursePackage.CoursePrice &&
                'text-decoration-line-through fs-14'
              }
            >
              {coursePackage.OriginalCoursePrice
                && `($ ${coursePackage.OriginalCoursePrice})`
              }
                {/* // : `$ ${coursePackage.OriginalCoursePrice}`} */}
            </span>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default SinglePackagePreview;
