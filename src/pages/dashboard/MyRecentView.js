import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import EmptyListElement from "../../components/Dashboard/EmptyListElement";
import Recomendations from "../../components/Dashboard/Recomendations";
import CardGrid from "../../components/Card/CourseCardGrid";
import { Row, Col, Menu, Input, Pagination } from "antd";
//statics
import newsImg1 from "../../assets/img/courses/News (1).png";
import newsImg2 from "../../assets/img/courses/News (2).png";
import newsImg3 from "../../assets/img/courses/News (3).png";
import sorryIcon from "../../assets/img/courses/sorry@2x.png";

// const recentviewData = [
//   // {
//   //   id: 1,
//   //   image: newsImg1,
//   //   title:
//   //     "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
//   //   instructor: "Tried a very long instructor",
//   //   rating: 4.5,
//   //   duration: 5,
//   //   progress: "60%",
//   // },
//   // {
//   //   id: 2,
//   //   image: newsImg2,
//   //   title: "Like same course but high price and longer than others",
//   //   instructor: "instructor",
//   //   rating: 4.5,
//   //   duration: 5,
//   //   progress: "75%",
//   // },
//   // {
//   //   id: 3,
//   //   image: newsImg3,
//   //   title:
//   //     "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
//   //   instructor: "very long instructor",
//   //   rating: 4.5,
//   //   duration: 5,
//   //   progress: "99%",
//   // },
//   // {
//   //   id: 4,
//   //   image: newsImg1,
//   //   title:
//   //     "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
//   //   instructor: "Tried a very long instructor",
//   //   rating: 4.5,
//   //   duration: 5,
//   //   progress: "60%",
//   // },
//   // {
//   //   id: 5,
//   //   image: newsImg2,
//   //   title: "Like same course but high price and longer than others",
//   //   instructor: "instructor",
//   //   rating: 4.5,
//   //   duration: 5,
//   //   progress: "75%",
//   // },
//   // {
//   //   id: 6,
//   //   image: newsImg3,
//   //   title:
//   //     "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
//   //   instructor: "very long instructor",
//   //   rating: 4.5,
//   //   duration: 5,
//   //   progress: "99%",
//   // },
// ];

const recommendData = [
  {
    id: 1,
    image: newsImg1,
    title:
      "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "Tried a very long instructor",
    rating: 4.5,
    duration: 5,
    price: 89.99,
    salePrice: 69.99,
  },
  {
    id: 2,
    image: newsImg2,
    title: "Like same course but high price and longer than others",
    instructor: "instructor",
    rating: 4.5,
    duration: 5,
    price: 89.99,
    salePrice: 39.99,
  },
  {
    id: 3,
    image: newsImg3,
    title:
      "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "very long instructor",
    rating: 4.5,
    duration: 5,
    price: 149.99,
    salePrice: 89.99,
  },
];

const MyRecentView = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQeury] = useState("");
  const [page, setPage] = useState(1);
  const recentviewData = JSON.parse(localStorage.getItem("recentView"))?JSON.parse(localStorage.getItem("recentView")):[];
  const { mycourses } = useSelector((state) => state.courseData);

  // console.log(JSON.parse(localStorage.getItem("recentView")))
  useEffect(() => {
    handleDataChange();
  }, [searchQuery, page]);

  const handlePageChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
  };

  const handleDataChange = () => {
    console.log(searchQuery, page);
  };

  useEffect(() => {
    if(mycourses == null){
      dispatch(getMyCourses(localStorage.getItem('CPDUserID')));
    }
  }, [dispatch]);

  return (
    <DashboardWrapper>
      <div className="dashboard-content-wrapper">
        {recentviewData.length === 0 ? (
          <>
            <EmptyListElement
              line1="You did not view anything recently"
              line2="Please browse course, we will record your browse history"
              btnTitle="Browse course"
            />
            <Recomendations list={recommendData} />
          </>
        ) : (
          <div className="w-100 pl-5">
            <Row justify="end" align="middle" className="pr-4">
              <Input
                addonAfter={<i className="fas fa-search"></i>}
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQeury(e.target.value)}
                bordered={false}
                className="w-20 bg-light-grey-1 border-radius-24 pl-3"
              />
            </Row>
            <Col md={24} lg={24}>
              <Row className="pt-4">
                {recentviewData?.map((item, index) => {
                  if(mycourses.some(mycourseitem=>mycourseitem.CourseID===item.CourseID)){
                    return
                  }
                  return (
                    <Col key={index} md={12} lg={6} className="pr-3 pb-3 ml-3">
                      <CardGrid data={item} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </div>
        )}
        {/* <Row justify='center' className='w-100 py-4'>
          <Pagination
            defaultCurrent={1}
            current={page}
            hideOnSinglePage
            pageSize={9}
            total={certificateData.length}
            onChange={handlePageChange}
          />
        </Row> */}
      </div>
    </DashboardWrapper>
  );
};

export default MyRecentView;
