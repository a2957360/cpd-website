import React from 'react';
import { Row, Col } from 'antd';

import { useHistory } from "react-router-dom";
//statics
import { srcURL } from '../../../configs/AppConfig';
import cat1 from '../../../assets/img/Categories (3).jpg';
import cat2 from '../../../assets/img/Categories (1).jpg';
import cat3 from '../../../assets/img/Categories (2).jpg';
import cat4 from '../../../assets/img/Categories (4).jpg';

// const categories = [
//   {
//     title: 'Accounting& Finance',
//     img: cat1,
//     cnt: 200,
//   },
//   {
//     title: 'Ethics& Fraud',
//     img: cat2,
//     cnt: 432,
//   },
//   {
//     title: 'InfromationTechnology',
//     img: cat3,
//     cnt: 503,
//   },
//   {
//     title: 'Development',
//     img: cat4,
//     cnt: 745,
//   },
// ];

const HomeTopCategory = ({ categories }) => {
  const history = useHistory();
  const handleToCategory = (category) => {
    history.push({
      pathname: "/course/list",
      // search: `?id=${CourseID}`,
      state: { courseParam: {category: category,
        parentLabel: 'CategoryName' } },
    });
  }
  return (
    <div className='home-top-category-wrapper w-100'>
      <Row
        justify='center'
        align='middle'
        className='w-100 home-top-category-title-container'
      >
        <div className='d-flex flex-column align-items-center justify-content-between'>
          <p className='fs-50 fw-500 pb-3'>
            <span className='color-light-theme'>Top</span> Categories
          </p>
          <p className='color-dark-grey-1 fs-20 w-400 vw-80 text-center'>
            Explore our popular categories and find your favorite subjects.
          </p>
        </div>
      </Row>
      <Row justify='center' className='w-100'>
        <Row
          justify='space-between'
          className='home-category-preview-container'
        >
          {categories.map((category) => (
            <Col key={category.CategoryID} xs={12} lg={6} className='mb-3 category-hover' onClick={() => handleToCategory(category.CategoryName)}>
              <div className='single-category-container mx-auto'>
                <img
                  src={`${srcURL}/images/courses/${category.CategoryImage}`}
                  alt='CPD Ace'
                  className='w-100 home-top-category-cover'
                />
                <div className='home-category-content px-3'>
                  <p className='home-category-title'>{category.CategoryName}</p>
                  <p className='home-category-subtitle'>
                    {category.TotalCourses}+ Courses
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Row>
    </div>
  );
};

export default HomeTopCategory;
