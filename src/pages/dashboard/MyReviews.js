import React, { useState } from 'react';
//components
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import EmptyListElement from '../../components/Dashboard/EmptyListElement';
import Recomendations from '../../components/Dashboard/Recomendations';
import Rating from '../../components/Ratings';
import { Row, Pagination } from 'antd';
//statics
import newsImg1 from '../../assets/img/courses/News (1).png';
import newsImg2 from '../../assets/img/courses/News (2).png';
import newsImg3 from '../../assets/img/courses/News (3).png';

const reviewData = [
  {
    id: 1,
    image: newsImg1,
    course: 'Python Course 01',
    name: 'Cindy',
    rate: 4.0,
    content:
      'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
  },
  {
    id: 1,
    image: newsImg1,
    course: 'Python Course 01',
    name: 'Cindy',
    rate: 4.0,
    content:
      'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
  },

  {
    id: 2,
    image: newsImg2,
    course: 'Game Design 6in 1',
    name: 'Luxy',
    rate: 4.0,
    content:
      'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
  },

  {
    id: 3,
    image: newsImg3,
    course: 'Python Course 01',
    name: 'Cindy',
    rate: 4.0,
    content:
      'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
  },

  {
    id: 4,
    image: newsImg1,
    course: 'Python Course 01',
    name: 'Cody',
    rate: 4.0,
    content:
      'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
  },
];

const recommendData = [
  {
    id: 1,
    image: newsImg1,
    title:
      'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
    instructor: 'Tried a very long instructor',
    rating: 4.5,
    duration: 5,
    price: 89.99,
    salePrice: 69.99,
  },
  {
    id: 2,
    image: newsImg2,
    title: 'Like same course but high price and longer than others',
    instructor: 'instructor',
    rating: 4.5,
    duration: 5,
    price: 89.99,
    salePrice: 39.99,
  },
  {
    id: 3,
    image: newsImg3,
    title:
      'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
    instructor: 'very long instructor',
    rating: 4.5,
    duration: 5,
    price: 149.99,
    salePrice: 89.99,
  },
];

const MyReviews = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = () => {
    console.log('handlePageChange');
  };
  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper'>
        {reviewData.length === 0 ? (
          <>
            <EmptyListElement
              line1='You did not say anything'
              line2='Please learning first and give a comments to the instructor'
              btnTitle='Browse course'
            />
            <Recomendations list={recommendData} />
          </>
        ) : (
          <div className='w-100'>
            {reviewData.map((review) => (
              <div
                key={review.id}
                className='p-2 my-3 d-flex dashboard-review-wrapper'
              >
                <div className='w-20'>
                  <img
                    src={review.image}
                    alt='CPD Ace'
                    className='review-cover'
                  />
                  <p className='fs-18 color-dark-grey-2 w-100 text-center mt-3'>
                    {review.course}
                  </p>
                </div>
                <div className='review-content'>
                  <p className='fs-20 color-dark-grey-2 mb-3'>
                    Review as {`"${review.name}"`}
                  </p>
                  <Rating rate={review.rate} />
                  <p className='mt-3 color-dark-grey-1 fs-16'>
                    {review.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Row justify='center' className='w-100 mt-5'>
          <Pagination
            defaultCurrent={1}
            current={page}
            onChange={handlePageChange}
            total={reviewData.length}
          />
        </Row>
      </div>
    </DashboardWrapper>
  );
};

export default MyReviews;
