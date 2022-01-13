import React from 'react';
//components
import { Row,Rate } from 'antd';
import Ratings from '../../components/Ratings';
//packages
import { useHistory } from 'react-router-dom';
import { srcURL } from '../../configs/AppConfig';

const heightList = {
  0: '250px',
  1: '250px',
  2: '500px',
  3: '400px',
  4: '300px',
  5: '400px',
  6: '450px',
  7: '500px',
  8: '450px'
}
const SingleCoursePreview = ({ course,srcUrl, index }) => {
  const history = useHistory();
  console.log(course);
  return (
    <div className='home-feature-course-container position-relative'>
      {srcUrl?(<img
        src={`${course.CourseImage}`}
        className='home-feature-course-cover'
        style={{height: heightList[index]}}
      />):(<img
      src={`${srcURL}${course.CourseImage}`}
      style={{height: heightList[index]}}
      className='home-feature-course-cover'
    />)
      }
      <div className='home-feature-course-content p-4 text-left'>
        <Row className='w-100'>
          <p className='p-lines p-lines-2-lh-25 fw-600 mb-0'>
            {course.CourseName}
          </p>
        </Row>
        {/* <Row className='fs-14 fw-300 w-100 py-1'>By {course.AuthorName}</Row> */}
        <Row
          justify='space-between'
          align='middle'
          className='fs-14 fw-300 w-100 my-2'
        >
          {course.RatingCountDecimal?<Row align='middle' className='w-80 text-truncate'>
            <Rate className="fs-16 mr-2" allowHalf disabled value={course.RatingCountDecimal} />
            {/* {course.RatingCountDecimal} */}
          </Row>:''}
          <Row align='middle' className='text-truncate'>
            <i className='far fa-clock mr-2'></i>
            {course.CourseDuration}h
          </Row>
        </Row>
        <Row className='w-100'>
          <div
            className='home-course-description-wrapper'
            dangerouslySetInnerHTML={{
              __html: course.CourseDescription,
            }}
          />
        </Row>
        <Row
          justify='space-between'
          align='middle'
          className='w-100 fs-20 fw-300 pt-2'
        >
          <span
            role='button'
            onClick={() => {
              history.push(
                `/course/detail/${course.CourseTitle}?id=${course.CourseID}`
              )
              const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView")))?JSON.parse(localStorage.getItem("recentView")):[]
              const resetCourse = recent.filter((item) => item.CourseID === course.CourseID);
              if(resetCourse.length === 0 ){
                const recentList =  [...recent, course];
                localStorage.setItem("recentView", JSON.stringify(recentList));
              }
            }}
          >
            <u>Learn More</u>
          </span>
          <Row align='bottom'>
            {course.CoursePrice && (
              <span className='mr-2'>${course.CoursePrice}</span>
            )}
            <span
              className={
                course.CoursePrice && 'text-decoration-line-through fs-14'
              }
            >
              {course.CoursePrice
                ? `($ ${course.OriginalCoursePrice})`
                : `$ ${course.OriginalCoursePrice}`}
            </span>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default SingleCoursePreview;
