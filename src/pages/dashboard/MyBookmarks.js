import React, { useState, useEffect } from 'react';
//components
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import EmptyListElement from '../../components/Dashboard/EmptyListElement';
import Recomendations from '../../components/Dashboard/Recomendations';
import BookmarkCourse from '../../components/Dashboard/BookmarkCourse';
import { Row, Col, Menu, Input, Pagination } from 'antd';
import {
  getMyBookMarks,getMyCourses
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
//statics
import newsImg1 from '../../assets/img/courses/News (1).png';
import newsImg2 from '../../assets/img/courses/News (2).png';
import newsImg3 from '../../assets/img/courses/News (3).png';
import sorryIcon from '../../assets/img/courses/sorry@2x.png';

const bookmarkData = [
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
  {
    id: 4,
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
    id: 5,
    image: newsImg2,
    title: 'Like same course but high price and longer than others',
    instructor: 'instructor',
    rating: 4.5,
    duration: 5,
    price: 89.99,
    salePrice: 39.99,
  },
  {
    id: 6,
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

const courseTabs = [
  { key: 'All', title: 'All' },
  { key: 'Learn Now', title: 'Learn Now' },
  { key: 'In Progress', title: 'In Progress' },
  { key: 'Completed', title: 'Completed' },
];
// getMyBookMarks
const MyBookmarks = () => {
  const [currentTab, setCurrentTab] = useState('All');
  const [searchQuery, setSearchQeury] = useState('');
  const [page, setPage] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(9);

  const dispatch = useDispatch();
  const { mybookmarks,mycourses } = useSelector((state) => state.courseData);
  useEffect(() => {
    dispatch(getMyBookMarks(localStorage.getItem('CPDUserID')));
  }, [currentTab, searchQuery, page]);

  useEffect(() => {
    handleDataChange();
  }, [currentTab, searchQuery, page]);

  useEffect(() => {
    if(mycourses == null){
      dispatch(getMyCourses(localStorage.getItem('CPDUserID')));
    }
  }, [dispatch]);

  const handleTabClick = (e) => {
    console.log('tab click', e);
    setCurrentTab(e.key);
  };

  const handlePageChange = (page, pageSize) => {
    setStartValue((page - 1) * 9);
    setEndValue(page * 9);
    setPage(page);
  };

  const handleDataChange = () => {
    console.log(currentTab, searchQuery, page);
  };

  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper'>
        {mybookmarks.length === 0 ? (
          <>
            <EmptyListElement
              line1='It seems you have no course here'
              line2='Please buy course first'
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
                className='w-20 bg-light-grey-1 border-radius-24 pl-3'
              />
            </Row>
            <div className='dashboard-grid-wrapper'>
              {mybookmarks.slice(startValue, endValue).map((course) => {
                if (mycourses.some(mycourseitem => mycourseitem.CourseID === course.CourseID)) {
                  return
                }
                return (
                  <BookmarkCourse key={course.id} course={course} />
                )
              })}
            </div>
          </div>
        )}
        <Row justify='center' className='w-100 py-4'>
          <Pagination
            defaultCurrent={1}
            current={page}
            hideOnSinglePage
            pageSize={9}
            total={mybookmarks.length}
            onChange={handlePageChange}
          />
        </Row>
      </div>
    </DashboardWrapper>
  );
};

export default MyBookmarks;
