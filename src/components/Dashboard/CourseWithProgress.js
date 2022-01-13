import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//components
import Ratings from '../../components/Ratings';
import { Divider, Row, Rate } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from "react-redux";

const CourseWithProgress = ({ course, btnTitle, type }) => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const { courseDetail } = useSelector((state) => state.courseData);
  // const userId = localStorage.getItem('CPDUserID');
  // console.log(courseDetail);
  // useEffect(() => {
  //   dispatch(getCourseById(course.CourseID, userId));
  // }, [])

  return (
    <div
      className='d-flex flex-column item-container mr-5'
      onClick={() => {
        if (!type) {
          history.push({
            pathname: `/course/detail-dashboard/${course.CourseTitle}`,
            search: `?id=${course.CourseID}`,
            state: { data: course, CertificateUrl: course.CertificateUrl },
          })
          const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
          const resetCourse = recent.filter((item) => item.CourseID === course.CourseID);
          if (resetCourse.length === 0) {
            const recentList = [...recent, course];
            localStorage.setItem("recentView", JSON.stringify(recentList));
          }
        } else {
          history.push({
            pathname: `/course/detail-mypackage/${course.CourseTitle}`,
            search: `?id=${course.CourseID}`,
            state: { data: course },
          })
          const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
          const resetCourse = recent.filter((item) => item.CourseID === course.CourseID);
          if (resetCourse.length === 0) {
            const recentList = [...recent, course];
            localStorage.setItem("recentView", JSON.stringify(recentList));
          }
        }
      }}
    >
      <img src={'http://13.68.229.216:8084/' + course.CourseImage} alt='/' className='item-cover-image' />

      <div className='item-content-container p-3'>
        <p className='color-dark-grey-2 fs-14 item-title'>{course.CourseTitle}</p>
        {
          course.AuthorName &&
          <div  onClick={(e) => {
            e.stopPropagation();
            history.push({
              pathname: `/course/instructor/${course.InstructorId}`,
            })
          }}>
            <span className='color-light-grey-2'>By </span>
            <span className='color-light-theme'>{course.AuthorName}</span>
          </div>
        }

        <div className='d-flex justify-content-between mt-2'>
          {
            course.RatingCount != 0 &&
            <span>
              <Rate className="fs-16 mr-2" allowHalf disabled value={course.RatingCountDecimal} />
              {/* <span className='color-light-grey-2'>({course.RatingCount})</span> */}
            </span>
          }
          <span className='d-flex align-items-center'>
            <HistoryOutlined className='fs-16 color-light-theme mr-2' />
            <span className='color-light-grey-2'>{course.CourseDuration}h</span>
          </span>
        </div>
        <Divider dashed className='mx-0 my-3' />
      </div>

      <div className='w-100 item-action-container px-3'>
        <Row justify='space-between' className='color-light-grey-2 justify-content-center'>
          {/* <span>3h25min Remain</span> */}
          <span className="color-dark-theme">{course.CourseCompletedPer + "%"}</span>
        </Row>
        <div className='position-relative progress-bar-container w-100'>
          <div className='progress-bar' style={{ width: `${course.CourseCompletedPer}%` }} />
        </div>
        <div
          role='button'
          className='rounded-pill button button--light-hover-dark button--animated item-button'
        >
          {
            course.CourseType == 1 &&
            <span className='fs-14'>{course.CertificateId ? "Get Certificate" : (course.CourseCompletedPer == 100 && course.AssessmentCompleted == 0) ? "Take Assessment" : course.CourseCompletedPer > 0 ? "Continue Learning" : "Learn Now"}</span>
          }
          {
            course.CourseType == 2 &&
            <span className='fs-14'>{course.CourseCompletedPer == 100 ? "Get Certificate" : course.CourseCompletedPer > 0 ? "Continue Learning" : "Learn Now"}</span>
          }
        </div>
      </div>
    </div>
  );
};

export default CourseWithProgress;
