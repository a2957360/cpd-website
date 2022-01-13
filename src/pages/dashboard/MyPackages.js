import React, { useState, useEffect } from 'react';
//components
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import DashboardTabs from '../../components/Dashboard/DashboardTabs';
import EmptyListElement from '../../components/Dashboard/EmptyListElement';
import Recomendations from '../../components/Dashboard/Recomendations';
import PackageWithProgress from '../../components/Dashboard/PackageWithProgress';
import SimpleFilter from '../../components/Filter/SimpleFilter';
import { Row, Col, Menu, Input, Pagination } from 'antd';
import CourseWithProgress from '../../components/Dashboard/CourseWithProgress';

//statics
import newsImg1 from '../../assets/img/courses/News (1).png';
import newsImg2 from '../../assets/img/courses/News (2).png';
import newsImg3 from '../../assets/img/courses/News (3).png';
import sorryIcon from '../../assets/img/courses/sorry@2x.png';
import {
  getMyPackages,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
const packageData = [
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

const packageTabs = [
  { key: 'All', title: 'All' },
  { key: 'Learn Now', title: 'Learn Now' },
  { key: 'In Progress', title: 'In Progress' },
  { key: 'Completed', title: 'Completed' },
];

const MyPackages = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('All');
  const [searchQuery, setSearchQeury] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(9);

  const { mypackages } = useSelector((state) => state.courseData);
  useEffect(() => {
    dispatch(getMyPackages(localStorage.getItem('CPDUserID')));
  }, [currentTab, searchQuery, page]);
  useEffect(() => {
    handleDataChange();
  }, [currentTab, searchQuery, page]);

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

  const handleDataChange = () => {
    console.log(currentTab, searchQuery, page);
  };
  useEffect(() => {
    const learn = [];
    const progress =[];
    const computed = [];
    setCourseData([])
    mypackages.forEach((item) => {
      if(item.CourseCompletedPer===0) {
        learn.push(item)
      }
      else if(item.CourseCompletedPer===100) {
        computed.push(item);
      }else {
        progress.push(item);
      }
    });
    if(currentTab === "Learn Now") {
      setCourseData(learn);
    }
    if(currentTab === "In Progress") {
      setCourseData(progress)
    }
    if(currentTab === "Completed") {
      setCourseData(computed)
    }else if(currentTab === "All") {
      setCourseData(mypackages)
    }
  }, [currentTab, mypackages]);
  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper'>
        {
        // courseData.length === 0 ? (
        //   <>
        //     <EmptyListElement
        //       line1='It seems you have no course here'
        //       line2='Please buy course first'
        //       btnTitle='Browse package'
        //     />
        //     <Recomendations list={recommendData} isPackage />
        //   </>
        // ) : (
          <div className='w-100 pl-5'>
            <Row
              justify='space-between'
              align='middle'
              className='dashboard-content-header-wrapper mx-auto'
            >
              <DashboardTabs
                tabs={packageTabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
              <SimpleFilter
                data={packageTabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
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
            {/* <div className='dashboard-grid-wrapper w-100'> */}
              {courseData.length>0 ? courseData?.slice(startValue, endValue).map((course) => (
                <CourseWithProgress
                  key={course.CourseID}
                  course={course}
                  btnTitle='Continue Learning'
                  type='package'
                />
              )): (<>
              <EmptyListElement
                line1='It seems you have no course here'
                line2='Please buy course first'
                btnTitle='Browse course'
              />
              {/* <Recomendations list={recommendData} /> */}
            </>)}
              {/* {courseData.map((pkg) => (
                <CourseWithProgress
                  key={pkg.id}
                  course={pkg}
                  btnTitle='Continue Learning'
                  type="package"
                />
              ))} */}
            </div>
          </div>
        }
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

export default MyPackages;
