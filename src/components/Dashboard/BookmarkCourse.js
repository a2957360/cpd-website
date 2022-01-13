import React from 'react';
import Ratings from '../../components/Ratings';
import { Divider, Row, Rate } from 'antd';
import { useHistory } from "react-router-dom";
import { HistoryOutlined } from '@ant-design/icons';

const BookmarkCourse = ({ course }) => {
  const history = useHistory();
  const addToCart = () => {
    console.log('add to cart', course.id);
  };

  const removeBookmark = () => {
    console.log('remove bookmark', course.id);
  };

  return (
    <div
      className='d-flex flex-column item-container  mr-5'
      onClick={() => {
        history.push({
          pathname: `/course/detail/${course.CourseTitle}`,
          search: `?id=${course.CourseID}`,
          state: { data: course },
        });
        const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
        const resetCourse = recent.filter((item) => item.CourseID === course.CourseID);
        if (resetCourse.length === 0) {
          const recentList = [...recent, course];
          localStorage.setItem("recentView", JSON.stringify(recentList));
        }
      }}
    >
      <img src={'http://13.68.229.216:8084/' + course.CourseImage} alt='/' />

      <div className='item-content-container p-3'>
        <p className='color-dark-grey-2 fs-14 item-title line-height-20 mb-0'>
          {course.CourseTitle}
        </p>
        {
          course.AuthorName &&
          <div style={{ height: 20, overflow: 'hidden' }}  onClick={(e) => {
            e.stopPropagation();
            history.push({
              pathname: `/course/instructor/${course.InstructorId}`,
            })
          }}>
            <span className='color-light-grey-2  line-height-20'>By </span>
            <span className='color-light-theme  line-height-20'>
              {course.AuthorName}
            </span>
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
        <Row justify='space-between' align='middle' className='w-100 px-3'>
          <p>
            {course.CoursePrice ? (
              <span className='fs-20 color-orange fw-800'>
                ${course.CoursePrice}{' '}
                <span className='text-decoration-line-through fs-16 color-dark-grey-1'>
                  ${course.OriginalCoursePrice}
                </span>
              </span>
            ) : (
              <span className='fs-20 color-dark-grey-1'>${course.OriginalCoursePrice}</span>
            )}
          </p>
          {/* <i
            role='button'
            className='far fa-trash-alt fs-16'
            onClick={() => removeBookmark()}
          ></i> */}
        </Row>
        <div
          role='button'
          className='rounded-pill button button--light-hover-dark button--animated item-button'
          onClick={() => addToCart()}
        >
          <span className='fs-14'>Add to Cart</span>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCourse;
