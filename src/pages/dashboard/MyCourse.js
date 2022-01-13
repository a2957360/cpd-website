import React, { useState, useEffect } from 'react';
//components
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import DashboardTabs from '../../components/Dashboard/DashboardTabs';
import EmptyListElement from '../../components/Dashboard/EmptyListElement';
import Recomendations from '../../components/Dashboard/Recomendations';
import CourseWithProgress from '../../components/Dashboard/CourseWithProgress';
import SimpleFilter from '../../components/Filter/SimpleFilter';
import { Row, Col, Menu, Input, Pagination } from 'antd';
import {
  getMyCourses,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
//statics
import newsImg1 from '../../assets/img/courses/News (1).png';
import newsImg2 from '../../assets/img/courses/News (2).png';
import newsImg3 from '../../assets/img/courses/News (3).png';
import sorryIcon from '../../assets/img/courses/sorry@2x.png';

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

const MyCourse = () => {
  const [currentTab, setCurrentTab] = useState('All');
  const [searchQuery, setSearchQeury] = useState('');
  const [page, setPage] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(9);

  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState([]);
  const { mycourses } = useSelector((state) => state.courseData);
  // console.log(mycourses);
  useEffect(() => {
    dispatch(getMyCourses(localStorage.getItem('CPDUserID')));
  }, [currentTab, searchQuery, page, dispatch]);
  // useEffect(() => {
  //   if(courseData.length===0 && mycourses && currentTab==="ALL") {
  //     setCourseData(mycourses);
  //   }
  // },[courseData, currentTab, mycourses])
  useEffect(() => {
    const learn = [];
    const progress =[];
    const computed = [];
    setCourseData([])
    mycourses.forEach((item) => {
      if(item.CourseCompletedPer===0) {
        learn.push(item)
      }
      else if(item.CourseCompletedPer===100 && item.AssessmentCompleted===1) {
        computed.push(item);
      }else {
        progress.push(item);
      }
    });
    // setStartValue(0);
    // setEndValue(9);
    console.log("why this called");
    if(currentTab === "Learn Now") {
      setCourseData(learn);
    }
    if(currentTab === "In Progress") {
      setCourseData(progress)
    }
    if(currentTab === "Completed") {
      setCourseData(computed)
    }else if(currentTab === "All") {
      setCourseData(mycourses)
    }
  }, [currentTab, mycourses]);

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
  console.log("coursedata", courseData);
  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper'>
        {/* {courseData.length === 0 ? (
          
        ) : ( */}
          <div className='w-100 pl-5'>
            <Row
              justify='space-between'
              align='middle'
              className='dashboard-content-header-wrapper mx-auto'
            >
              <DashboardTabs
                tabs={courseTabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
              <SimpleFilter
                data={courseTabs}
                current={currentTab}
                setCurrent={setCurrentTab}
              />
              <Input
                addonAfter={<i className='fas fa-search'></i>}
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQeury(e.target.value)}
                bordered={false}
                className='bg-light-grey-1 border-radius-24 pl-3'
              />
            </Row>
            <div className='dashboard-grid-wrapper w-100'>
              {courseData.length>0 ? courseData?.slice(startValue, endValue).map((course,index) => (
                <>
                <CourseWithProgress
                  key={course.CourseID}
                  course={course}
                  btnTitle='Continue Learning'
                  index={index}
                />
                </>
              )): (<>
              <EmptyListElement
                line1='It seems you have no course here'
                line2='Please buy course first'
                btnTitle='Browse course'
              />
              {/* <Recomendations list={recommendData} /> */}
            </>)}
            </div>
          </div>
        {/* )} */}
        <Row justify='center' className='w-100 py-4'>
          <Pagination
            defaultCurrent={1}
            current={page}
            hideOnSinglePage
            pageSize={9}
            total={courseData.length}
            onChange={handlePageChange}
          />
        </Row>
      </div>
    </DashboardWrapper>
  );
};

export default MyCourse;
