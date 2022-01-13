import React from 'react';
//packages
import { useHistory } from 'react-router-dom';
//components
import { Row, Col } from 'antd';
import Masonry from 'react-masonry-css';
import FeatureCoursePreview from '../../../components/Home/FeatureCoursePreview';

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  992: 3,
  768: 2,
};
const arr = [
  250,200,200,
  180,280,220,
  250,210,270
]
const HomeFeatureCourses = (props) => {
  const history = useHistory();
  const  courseList  = props.courseList.map(
    (course,i)=>{ 
      course.height = arr[i] 
      return course
    }
  )

  return (
    <div className='home-feature-courses-wrapper'>
      <div
        className='home-feature-courses-title-container'
      >
        <p className='fs-50 fw-300 pb-3'>
          FEATURED <span className='color-light-theme'>COURSES</span>
        </p>
        <p className='color-dark-grey-1 fs-20 fw-400 text-center home-feature-courses-subtitle'>
          Not sure where to start?<br/> Choose from our top selling courses.
        </p>
      </div>

      <Masonry
        className='w-70 home-feature-course-list-wrapper '
        columnClassName='pl-4'
        breakpointCols={breakpointColumnsObj}
      >
        {courseList.map((course, index) => (
          <FeatureCoursePreview key={course.CourseID} course={course} index={index} />
        ))}
      </Masonry>

      <Row justify='center' align='middle' className='w-100 py-3 mt-5'>
        <div
          role='button'
          className='rounded-pill button button-white-border button--light-hover-white button--animated'
          onClick={() => history.push({
            pathname: "/course/list",
            state: { courseParam: { category: "All", parentLabel: 'Course Type' } },
          })}
        >
          Explore Courses
        </div>
      </Row>
    </div>
  );
};

export default HomeFeatureCourses;
