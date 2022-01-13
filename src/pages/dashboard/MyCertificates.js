import React, { useState, useEffect } from 'react';
//components
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import EmptyListElement from '../../components/Dashboard/EmptyListElement';
import Recomendations from '../../components/Dashboard/Recomendations';
import CertificateCourse from '../../components/Dashboard/certificateCourse';
import SectionTitle from '../../components/Dashboard/SectionTitle';
import DarkThemeDivider from '../../components/Divider';
import {
  getMyCertificates,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Menu, Input, Pagination } from 'antd';
//statics
import newsImg1 from '../../assets/img/courses/News (1).png';
import newsImg2 from '../../assets/img/courses/News (2).png';
import newsImg3 from '../../assets/img/courses/News (3).png';
import sorryIcon from '../../assets/img/courses/sorry@2x.png';
// 
const certificateData = {
  2021: [
    {
      id: 1,
      image: newsImg1,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'Tried a very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '60%',
    },
    {
      id: 2,
      image: newsImg2,
      title: 'Like same course but high price and longer than others',
      instructor: 'instructor',
      rating: 4.5,
      duration: 5,
      progress: '75%',
    },
    {
      id: 3,
      image: newsImg3,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '99%',
    },
    {
      id: 4,
      image: newsImg1,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'Tried a very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '60%',
    },
    {
      id: 5,
      image: newsImg2,
      title: 'Like same course but high price and longer than others',
      instructor: 'instructor',
      rating: 4.5,
      duration: 5,
      progress: '75%',
    },
    {
      id: 6,
      image: newsImg3,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '99%',
    },
  ],
  2020: [
    {
      id: 1,
      image: newsImg1,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'Tried a very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '60%',
    },
    {
      id: 2,
      image: newsImg2,
      title: 'Like same course but high price and longer than others',
      instructor: 'instructor',
      rating: 4.5,
      duration: 5,
      progress: '75%',
    },
    {
      id: 3,
      image: newsImg3,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '99%',
    },
    {
      id: 4,
      image: newsImg1,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'Tried a very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '60%',
    },
    {
      id: 5,
      image: newsImg2,
      title: 'Like same course but high price and longer than others',
      instructor: 'instructor',
      rating: 4.5,
      duration: 5,
      progress: '75%',
    },
    {
      id: 6,
      image: newsImg3,
      title:
        'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
      instructor: 'very long instructor',
      rating: 4.5,
      duration: 5,
      progress: '99%',
    },
  ],
};

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

const MyCertificates = () => {
  const [currentTab, setCurrentTab] = useState('All');
  const [searchQuery, setSearchQeury] = useState('');
  const [page, setPage] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(9);

  const dispatch = useDispatch();
  const { mycertificates } = useSelector((state) => state.courseData);
  const [courseData, setCourseData] = useState(mycertificates);
  useEffect(() => {
    dispatch(getMyCertificates(localStorage.getItem('CPDUserID')));
  }, [currentTab, searchQuery, page]);
  useEffect(() => {
    const learn = [];
    const progress =[];
    const computed = [];
    mycertificates.forEach((item) => {
      if(item.CourseCompletedPer===0) {
        learn.push(item)
      }
      if(0<item.CourseCompletedPer<100) {
        progress.push(item);
      }
      if(item.CourseCompletedPer===100) {
        computed.push(item);
      }
    });
    if(currentTab === "Learn Now") {
      setCourseData(learn)
    }
    if(currentTab === "In Progress") {
      setCourseData(progress)
    }
    if(currentTab === "Completed") {
      setCourseData(computed)
    }else if(currentTab === "All") {
      setCourseData(mycertificates)
    }
  }, [currentTab, mycertificates]);

  const handleTabClick = (e) => {
    console.log('tab click', e);
    setCurrentTab(e.key);
  };

  useEffect(() => {
    setStartValue(0);
    setEndValue(9);
    setPage(1);
  }, [currentTab]);

  const handlePageChange = (page, pageSize) => {
    setStartValue((page - 1) * 9);
    setEndValue(page * 9);
    setPage(page);
  };
  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper'>
        {mycertificates.length === 0 ? (
          <>
            <EmptyListElement
              line1='It seems you didn’t get any certificates'
              line2='Please continue learning if you have already bought course, or browse course'
              btnTitle='Browse course'
            />
            <Recomendations list={recommendData} />
          </>
        ) : (
          <div className='w-100 pl-5'>
            <Row
              justify='end'
              align='middle'
              className='dashboard-content-header-wrapper mx-auto py-3'
            >
              <Input
                addonAfter={<i className='fas fa-search'></i>}
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQeury(e.target.value)}
                bordered={false}
                className='bg-light-grey-1 border-radius-24 pl-3'
              />
            </Row>
            <div key='2021' className='w-100'>
              <SectionTitle title={`Achievement`} />
              <DarkThemeDivider />
              <div className='dashboard-grid-wrapper'>
                {mycertificates.slice(startValue, endValue).map((course) => (
                  <CertificateCourse
                    key={course.id}
                    course={course}
                    btnTitle='Download Certificate'
                  />
                ))}
              </div>
            </div>
            {/* {Object.keys(certificateData)
              .sort((a, b) => (a > b ? -1 : 1))
              .map((yearNum) => (
                <div key={yearNum} className='w-100'>
                  <SectionTitle title={`${yearNum} Achievement`} />
                  <DarkThemeDivider />
                  <div className='dashboard-grid-wrapper'>
                    {certificateData[yearNum].map((course) => (
                      <CourseWithProgress
                        key={course.id}
                        course={course}
                        btnTitle='Download Certificate'
                      />
                    ))}
                  </div>
                </div>
              ))} */}
          </div>
        )}
        <Row justify='center' className='w-100 py-4'>
          <Pagination
            defaultCurrent={1}
            current={page}
            hideOnSinglePage
            pageSize={9}
            total={mycertificates.length}
            onChange={handlePageChange}
          />
        </Row>
      </div>
    </DashboardWrapper>
  );
};

export default MyCertificates;
