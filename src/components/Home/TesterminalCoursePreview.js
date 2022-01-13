import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCourseByIdNoUser } from "../../redux/actions";
//components
import { Row, Rate } from 'antd';
import Ratings from '../Ratings';
//packages
import { useHistory } from 'react-router-dom';
import { srcURL } from '../../';
import course1 from '../../assets/img/home/Home_Page_Testimonial_Detail_Image_1.png';
import course2 from '../../assets/img/home/Home_Page_Testimonial_Detail_Image_2.png';
import course3 from '../../assets/img/home/Home_Page_Testimonial_Detail_Image_3.png';
import course4 from '../../assets/img/home/Home_Page_Testimonial_Detail_Image_4.png';

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

const images = [
  course1,
  course2,
  course3,
  course4,
];
const SingleCoursePreview = ({ courseId, srcUrl, index }) => {
  const dispatch = useDispatch();
  const domain = "/Image";

  const history = useHistory();
  const { courseDetailNoUser } = useSelector((state) => state.courseData);
  const [coursInfo, setcoursInfo] = useState(courseDetailNoUser);

  useEffect(() => {
    if (courseDetailNoUser == null || courseDetailNoUser.CourseID != courseId) {
      console.log(courseId, courseDetailNoUser);
      dispatch(getCourseByIdNoUser(courseId));
    }
  }, []);
  useEffect(() => {
    if (courseDetailNoUser !== null) {
      if (courseDetailNoUser?.CourseID == courseId) {
        setcoursInfo(courseDetailNoUser);
      }
    }
  }, [courseDetailNoUser]);
  console.log("test", courseId, coursInfo);
  if (coursInfo == null) {
    return "";
  }

  return (
    <div className='home-feature-course-container position-relative'>
      <img
        src={`${images[index]}`}
        className='home-feature-course-cover'
      />
      <div className='home-feature-course-content p-4 text-left'>
        <Row className='w-100'>
          <p className='p-lines p-lines-2-lh-25 fw-600 mb-0'>
            {coursInfo.CourseName}
          </p>
        </Row>
        {
          coursInfo.AuthorName &&
          <Row className='fs-14 fw-300 w-100 py-1' onClick={(e) => {
            e.stopPropagation();
            history.push({
              pathname: `/course/instructor/${coursInfo.InstructorId}`,
            })
          }}>By {coursInfo.AuthorName}</Row>
        }
        <Row
          justify='space-between'
          align='middle'
          className='fs-14 fw-300 w-100 my-2'
        >
          {coursInfo.RatingCountDecimal ? <Row align='middle' className='w-80 text-truncate'>
            <Rate className="fs-16 mr-2" allowHalf disabled value={coursInfo.RatingCountDecimal} />
            {/* {courseDetailNoUser.RatingCountDecimal} */}
          </Row> : ''}
          <Row align='middle' className='text-truncate'>
            <i className='far fa-clock mr-2'></i>
            {coursInfo.CourseDuration}h
          </Row>
        </Row>
        <Row className='w-100'>
          <div
            className='home-course-description-wrapper'
            dangerouslySetInnerHTML={{
              __html: coursInfo.CourseDescription,
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
                `/course/detail/${coursInfo.CourseTitle}?id=${coursInfo.CourseID}`
              )
              const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
              const resetCourse = recent.filter((item) => item.CourseID === coursInfo.CourseID);
              if (resetCourse.length === 0) {
                const recentList = [...recent, coursInfo];
                localStorage.setItem("recentView", JSON.stringify(recentList));
              }
            }}
          >
            <u>Learn More</u>
          </span>
          <Row align='bottom'>
            {coursInfo.CoursePrice && (
              <span className='mr-2'>${coursInfo.CoursePrice}</span>
            )}
            <span
              className={
                coursInfo.CoursePrice && 'text-decoration-line-through fs-14'
              }
            >
              {coursInfo.CoursePrice
                ? `($ ${coursInfo.OriginalCoursePrice})`
                : `$ ${coursInfo.OriginalCoursePrice}`}
            </span>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default SingleCoursePreview;
