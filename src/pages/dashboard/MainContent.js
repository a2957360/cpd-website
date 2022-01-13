import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

//components
import { Row, Col, Rate, Divider } from 'antd';
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import SectionTitle from '../../components/Dashboard/SectionTitle';
import DarkThemeDivider from '../../components/Divider';
import CourseWithProgress from '../../components/Dashboard/CourseWithProgress';
import EventCard from '../../components/Card/EventCard';
import EmptyListElement from '../../components/Dashboard/EmptyListElement';
//statics
import icon1 from '../../assets/img/courses/IconColour (1).png';
import icon2 from '../../assets/img/courses/IconColour (2).png';
import icon3 from '../../assets/img/courses/IconColour (3).png';
import icon4 from '../../assets/img/courses/IconColour (4).png';
import icon5 from '../../assets/img/courses/IconColour (5).png';
import newsImg1 from '../../assets/img/courses/News (1).png';
import newsImg2 from '../../assets/img/courses/News (2).png';
import newsImg3 from '../../assets/img/courses/News (3).png';
import eventImg1 from '../../assets/img/courses/Events.png';
import eventImg2 from '../../assets/img/courses/Review.png';
import sorryIcon from '../../assets/img/courses/sorry@2x.png';

import { useDispatch, useSelector } from "react-redux";
import { getMyDashBoardContent, getMyCourses, getMyPackages } from "../../redux/actions";



const courseData = [
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
];

const eventList = [
  // {
  //   id: 1,
  //   image: eventImg1,
  //   title: 'This is a events name, It should be longer',
  //   text:
  //     'Should more words to tell your something, test test test, New best course for Python, please check me if you like this course click me to add… test test test, New best course for Python, please check me if you like this.',
  //   time: '8:00PM, Feb 25, 2021',
  // },
  // {
  //   id: 2,
  //   image: eventImg2,
  //   title: 'This is a events name, It should be longer',
  //   text:
  //     'Should more words to tell your something, test test test, New best course for Python, please check me if you like this course click me to add… test test test, New best course for Python, please check me if you like this.',
  //   time: '8:00PM, Feb 25, 2021',
  // },
];

const MainContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { myDashBoard } = useSelector((state) => state.courseData);
  const [totalDuration, settotalDuration] = useState(0);

  const overviewIcons = [
    {
      img: icon1,
      title: 'Active Courses',
      count: myDashBoard?.NoOfCourses,
    },
    {
      img: icon2,
      title: 'Active Packages',
      count: myDashBoard?.NoOfPackages,
    },
    {
      img: icon3,
      title: 'Certificates',
      count: myDashBoard?.NoOfCerticates,
    },
    {
      img: icon4,
      title: 'Reviews',
      count: myDashBoard?.NoOfReviews,
    },
    {
      img: icon5,
      title: 'Bookmarks',
      count: myDashBoard?.NoOfBookMarks,
    },
  ];
  const { mycourses } = useSelector((state) => state.courseData);
  useEffect(() => {
    dispatch(getMyCourses(localStorage.getItem('CPDUserID')));
  }, []);
  const { mypackages } = useSelector((state) => state.courseData);
  useEffect(() => {
    dispatch(getMyPackages(localStorage.getItem('CPDUserID')));
  }, []);
  useEffect(() => {
    const userId = localStorage.getItem("CPDUserID");
    dispatch(getMyDashBoardContent(userId));
  }, []);
  useEffect(() => {
    console.log("enter dashboard", mycourses);
    console.log(mypackages)
    let total = 0;
    mycourses.forEach(element => {
      total += (element.CourseCompletedPer * element.CourseDuration);
    })
    mypackages.forEach(element => {
      total += (element.CourseCompletedPer * element.CourseDuration);
    })
    total = (total * 0.01).toFixed(2)
    console.log(total);
    settotalDuration(total);
  }, [mycourses, mypackages])
  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper'>
        <Row
          justify='space-between'
          align='middle'
          className='dashboard-overview-wrapper mx-auto'
        >
          {overviewIcons.map((item) => (
            <div
              key={item.title}
              className='dashboard-overview-container d-flex flex-column align-items-center'
            >
              <img
                src={item.img}
                alt='CPD Ace'
                className='dashboard-overview-icon'
              />
              <p className='fs-16 color-dark-grey-1 py-1'>{item.title}</p>
              <p className='fs-20 color-dark-grey-2'>{item.count}</p>
            </div>
          ))}
        </Row>
        <SectionTitle
          title='Continue your learning'
          section='time'
          data={totalDuration + ' hours'}
        />
        <DarkThemeDivider />
        <div className='dashboard-grid-wrapper w-100'>
          {mycourses.filter((course) =>
            course.CourseCompletedPer !== 100
            || course.AssessmentCompleted !== 1).length > 0 ? (
            mycourses.map((course) => (
              course.CourseCompletedPer !== 100
              || course.AssessmentCompleted !== 1
              &&
              <CourseWithProgress
                key={course.id}
                course={course}
                btnTitle='Continue Learning'
              />
            ))
          ) : (
            <>

              <EmptyListElement
                line1='It seems you have no course here'
                line2='Please buy course first'
                btnTitle='Browse course'
              /><div
                role='button'
                className='w-30 m-auto rounded-pill button button--light-hover-dark button--animated mb-3 px-2'
                onClick={() => history.push({
                  pathname: "/course/list",
                  state: { courseParam: { category: "All", parentLabel: 'Course Type' } },
                })}
              >
                <span className='fs-14'>Browse course</span>
              </div></>

          )}
        </div>
        {mycourses.filter((course) =>
          course.CourseCompletedPer !== 100
          || course.AssessmentCompleted !== 1).length > 0 && (
            <Row className='w-100 mt-5 pr-3 dashboard-action-button'>
              <div
                role='button'
                className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3'
              >
                <span className='fs-14'>View All</span>
              </div>
            </Row>
          )}
        <SectionTitle
          title='Upcoming events'
          section='event'
          data={eventList.length === 0 ? '' : 'Feb 25, 2021'}
        />
        <DarkThemeDivider />
        {eventList.length > 0 ? (
          eventList.map((event) => (
            <div key={event.id} className='mt-4 '>
              <EventCard data={event} />
            </div>
          ))
        ) : (
          <EmptyListElement
            line1='It seems you have no register events'
            line2='Please browse events and attend'
            btnTitle='Browse events'
          />
        )}
      </div>
    </DashboardWrapper>
  );
};

export default MainContent;
