import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
//component
import LoadingSpinner from '../../components/LoadingSpinner';
import CardHorizontal from "../../components/Card/InstructorCourseHorizontal";
import PageHeader from '../../components/PageHeader';
import Ratings from '../../components/Ratings';
import ReviewList from '../course/components/ReviewList';
import ReviewForm from '../../components/Form/ReviewForm';
import { Row, Col, message } from 'antd';
//redux
import { getInstructorDetail } from '../../redux/actions';
//statics
import { baseURL, srcURL } from '../../configs/AppConfig';
import newsImg1 from '../../assets/img/img-news-1.png';
import newsImg2 from '../../assets/img/img-news-2.png';
import newsImg3 from '../../assets/img/img-news-3.png';
import avatarImg1 from '../../assets/img/avatar-man.png';
import avatarImg2 from '../../assets/img/avatar-woman.png';

// const courseData = [
//   {
//     id: 1,
//     image: newsImg1,
//     title:
//       'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//     text: 'Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//     instructor: 'Tried a very long instructor',
//     category: 'Accounting',
//     rating: 4.5,
//     duration: 5,
//     price: 99.99,
//     originalPrice: 199.99,
//   },
//   {
//     id: 2,
//     image: newsImg2,
//     title: 'Like same course but high price and longer than others',
//     text: 'Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//     instructor: 'instructor',
//     category: 'Accounting',
//     rating: 4.5,
//     duration: 5,
//     price: 99.99,
//     originalPrice: 199.99,
//   },
//   {
//     id: 3,
//     image: newsImg3,
//     title:
//       'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//     text: 'Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//     instructor: 'very long instructor',
//     category: 'Spacing',
//     rating: 4.5,
//     duration: 5,
//     price: 99.99,
//     originalPrice: 199.99,
//   },
//   {
//     id: 4,
//     image: newsImg2,
//     title: 'Short Name',
//     text: 'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//     instructor: 'very long instructor',
//     category: 'Spacing',
//     rating: 4.5,
//     duration: 5,
//     price: 99.99,
//     originalPrice: 199.99,
//   },
//   {
//     id: 5,
//     image: newsImg1,
//     title: 'Game Design',
//     text: 'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//     instructor: 'instructor',
//     category: 'Spacing',
//     rating: 4.5,
//     duration: 5,
//     price: 99.99,
//     originalPrice: 199.99,
//   },
// ];

const reviewData = {
  reviews: [
    {
      name: 'Bob Laza',
      avatar: avatarImg1,
      rating: 4.5,
      content:
        'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
    },
    {
      name: 'Lucy Cris',
      avatar: avatarImg2,
      rating: 1.5,
      content:
        'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
    },
    {
      name: 'Bob Laza',
      avatar: avatarImg1,
      rating: 3.5,
      content:
        'I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.',
    },
  ],
};

const InstructorDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const breadcrumb = [
    {
      title: 'Instructor',
      path: '',
    },
  ];
  const [detail, setDetail] = useState();
  const [courseData, setcourseData] = useState([]);

  useEffect(() => {
    getInstructorDetail();
    getInstructorCourse();
  }, [id]);

  const getInstructorDetail = () => {
    axios
      .get(`${baseURL}/GetInstructorInfoById/${id}`)
      .then(({ data }) => {
        setDetail(data[0]);
      })
      .catch((error) => {
        // if (error.response.status === 500) {
        //   message.error('Instructor not found');
        // }
        setTimeout(() => history.goBack(), 1000);
      });
  };
  const getInstructorCourse = () => {
    axios
      .get(`${baseURL}/GetCoursesByInstructor/?instructorId=${id}`)
      .then(({ data }) => {
        setcourseData(data);
      })
      .catch((error) => {
        // if (error.response.status === 500) {
        //   message.error('Instructor not found');
        // }
        setTimeout(() => history.goBack(), 1000);
      });
  };
console.log(detail)
  if (!detail) {
    return (
      <div className='w-70 m-auto d-flex justify-content-center alight-items-center vh-60'>
        <LoadingSpinner />;
      </div>
    );
  } else {
    return (
      <div className='instructor-profile-wrapper'>
        <div style={{backgroundImage:"/Image/courseview.jpg"}} className="vh-30 bg-image bg-image--instructor-detail d-flex justify-content-center align-items-center"></div>
        <div className='w-100 '>
          <div className='w-70 mx-auto py-3'>
            {/* <PageHeader data={breadcrumb} theme='white' /> */}
            <Row
              justify='space-between'
              className='instructor-profile-container mx-auto'
            >
              <div className='instructor-image'>
                <img src={`${srcURL}${detail.ProfilePicUrl}`} alt='CPD Ace' />
              </div>
              <div className='instructor-profile'>
                <Row justify='space-between' className='w-50 mb-3'>
                  <p className='mb-0 fs-30 fw-normal '>
                    {detail.FirstName} {detail.LastName}
                  </p>
                  {/* <Row align='middle' className='ml-4 fs-20 '>
                    <Ratings rate={detail.InstructorRating} />
                    {detail.InstructorRating}
                  </Row> */}
                </Row>
                {/* <p className='fs-20 fw-normal mb-2'>
                  Instructing <span>{detail.NumberOfCourses}</span> courses in
                  CPDAce
                </p>
                <div className='dark-short-bar' />
                <div
                  className='fs-20 instructor-about'
                  dangerouslySetInnerHTML={{ __html: detail.About }}
                /> */}
              </div>
            </Row>
          </div>
        </div>
        <div className='instructor-profile-container mx-auto'>
          <div className='instructor-courses-container mb-5'>
            <p className='fs-50 color-black'>
              INSTRUCTOR <span className='color-light-theme'>COURSES</span>
            </p>
            {/* <p className='color-dark-grey-1 fs-20 w-80'>
              CPD Ace offers an extensive library of video courses for CPAs to
              build and maintain skills in accounting and finance, risk
              management, IT and development
            </p> */}
          </div>
          {/* </div> */}
          {/* <div className="w-100"> */}
            <div className="w-100">
              {courseData?.map((item, index) => {
                return (
                  <Row><Col key={index} md={12} lg={6} className='pr-3 pb-3'>
                    <CardHorizontal data={item} similarList={[]}/>
                  </Col>
                  </Row>
                );
              })}
            </div>
          </div>
          {/* <div className='mt-100'>
            <ReviewList data={reviewData} />
            <ReviewForm type='instructor' targetId={detail.id} />
          </div> */}
        
      </div>
    );
  }
};

export default InstructorDetail;
