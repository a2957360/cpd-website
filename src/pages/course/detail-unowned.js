import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getRelatedCourses, getCartList } from "../../redux/actions";

//packages
import { Modal, Avatar, Rate, Row, Col, Divider, Collapse, message } from "antd";
import Carousel from "react-elastic-carousel";
import ReactPlayer from "react-player";
import {
  GlobalOutlined,
  ReadOutlined,
  ProfileOutlined,
  HistoryOutlined,
  FileProtectOutlined,
  ExportOutlined,
  PlusOutlined,
  MinusOutlined,
  PlaySquareFilled,
  FilePdfFilled,
  FileImageFilled,
  FileFilled,
  FileZipFilled,
} from "@ant-design/icons";

//components
import PageHeader from "../../components/PageHeader";
import CardGrid from "../../components/Card/CourseCardGrid";
import CourseCarousel from "../../components/Carousels/CourseCarousel";
import DetailHeader from "./components/DetailHeader";
import ReviewList from "./components/ReviewList";
import AddToCartModal from "../../components/Modal/AddToCartModal";
import RouterLoading from "../../components/RouterLoading";
import HowToWords from "./components/HowToWords";
import LoginForm from "../../components/Header/LoginForm";
import RegistrationForm from "../../components/Header/RegistrationForm";

import axios from "axios";
import { secondBaseURL } from "../../configs/AppConfig";

//real img
import bookmarkStar from "../../assets/img/img-bookmark-star.png";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";
import avatarImg1 from "../../assets/img/avatar-man.png";
import avatarImg2 from "../../assets/img/avatar-woman.png";
import { propTypes } from "react-bootstrap/esm/Image";

const detailData = {
  id: 1,
  image: newsImg1,
  title: "Game Design",
  text: "Looking for a 20-hours package deal to complete your 2020 CPA PD requirement? We have the perfect hybrid course bundle for CPA to learn both the Finance and the Tech. This package is recommended by leading professionals in the industry, ● Technical writing ■ Title and Content_01 ■ Title and Content_02 ■ Title and Content_03, this should be shown more ● Reference works ● Notes",
  overview:
    "Looking for a 20-hours package deal to complete your 2020 CPA PD requirement? We have the perfect hybrid course bundle for CPA to learn both the Finance and the Tech. This package is recommended by leading professionals in the industry.",
  instructor: "Tried a very long instructor",
  flowchart:
    "Looking for a 20-hours package deal to complete your 2020 CPA PD requirement? We have the perfect hybrid course bundle for CPA to learn both the Finance and the Tech. This package is recommended by leading professionals in the industry.",
  category: "Accounting",
  rating: 4.5,
  duration: 5,
  price: 99.99,
  originalPrice: 199.99,
  tags: ["web", "front-end", "node"],
  bookmark: true,
  reviews: [
    {
      name: "Bob Laza",
      avatar: avatarImg1,
      rating: 4.5,
      content:
        "I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.",
    },
    {
      name: "Lucy Cris",
      avatar: avatarImg2,
      rating: 1.5,
      content:
        "I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.",
    },
    {
      name: "Bob Laza",
      avatar: avatarImg1,
      rating: 3.5,
      content:
        "I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.",
    },
  ],
  feature: [
    {
      icon: (
        <HistoryOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Duration",
      content: "20 Hours",
    },
    {
      icon: (
        <ProfileOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Content",
      content: "14 Courses",
    },
    {
      icon: (
        <ReadOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Skill Level",
      content: "Intermediate",
    },
    {
      icon: (
        <FileProtectOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Certification",
      content: "Yes",
    },
    {
      icon: (
        <ExportOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Available Access",
      content: "Video",
    },
    {
      icon: (
        <GlobalOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Language",
      content: "English",
    },
  ],
  content: [
    {
      title: "001 Introduce HTML5 for…",
      number: 5,
      files: [
        {
          icon: <PlaySquareFilled />,
          title: "001_HTML5 Lecture 1",
          size: "35min",
        },
        {
          icon: <FilePdfFilled />,
          title: "002_HTML5 Lecture 2",
          size: "13KB",
        },
        {
          icon: <FileImageFilled />,
          title: "003_HTML5 Lecture 3",
          size: "3.5MB",
        },
        {
          icon: <FileFilled />,
          title: "004_HTML5 Lecture 4 ZPI",
          size: "13KB",
        },
        {
          icon: <FileZipFilled />,
          title: "005_HTML5 Lecture 1234124124124",
          size: "3.5MB",
        },
      ],
    },
    {
      title: "002 Introduce HTML5 for…",
      number: 5,
      files: [
        {
          icon: <PlaySquareFilled />,
          title: "001_HTML5 LectureETERTERT",
          size: "35min",
        },
        {
          icon: <FilePdfFilled />,
          title: "002_HTML5 LectureER",
          size: "13KB",
        },
        {
          icon: <FileImageFilled />,
          title: "003_HTML5 LectureTRTRT",
          size: "3.5MB",
        },
        {
          icon: <FileFilled />,
          title: "004_HTML5 LecturEEEe",
          size: "13KB",
        },
        {
          icon: <FileZipFilled />,
          title: "005_HTML5",
          size: "3.5MB",
        },
      ],
    },
  ],
  relatedCourses: [
    {
      id: 1,
      image: newsImg1,
      title:
        "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      instructor: "Tried a very long instructor",
      category: "Accounting",
      rating: 4.5,
      duration: 5,
      price: 99.99,
      originalPrice: 199.99,
    },
    {
      id: 2,
      image: newsImg2,
      title: "Like same course but high price and longer than others",
      text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      instructor: "instructor",
      category: "Accounting",
      rating: 4.5,
      duration: 5,
      price: 99.99,
      originalPrice: 199.99,
    },
    {
      id: 3,
      image: newsImg3,
      title:
        "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      instructor: "very long instructor",
      category: "Spacing",
      rating: 4.5,
      duration: 5,
      price: 99.99,
      originalPrice: 199.99,
    },
    {
      id: 4,
      image: newsImg2,
      title: "Short Name",
      text: "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      instructor: "very long instructor",
      category: "Spacing",
      rating: 4.5,
      duration: 5,
      price: 99.99,
      originalPrice: 199.99,
    },
    {
      id: 5,
      image: newsImg1,
      title: "Game Design",
      text: "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      instructor: "instructor",
      category: "Spacing",
      rating: 4.5,
      duration: 5,
      price: 99.99,
      originalPrice: 199.99,
    },
  ],
};

const { Panel } = Collapse;

const Detail = (props) => {
  const history = useHistory();


  const userId = localStorage.getItem('CPDUserID');
  const [videoUrl, setVideoUrl] = useState("");
  const [visibleVideo, setVisibleVideo] = useState(false);
  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });
  const dispatch = useDispatch();
  // const {
  //   id,
  //   image,
  //   title,
  //   text,
  //   instructor,
  //   category,
  //   rating,
  //   duration,
  //   price,
  //   originalPrice,
  //   overview,
  //   flowchart,
  //   tags,
  //   content,
  //   bookmark,
  //   reviews,
  //   relatedCourses,
  // } = detailData;
  const [bookmarkState, setBookmarkState] = useState(props.data?.BookMarked);
  const [visible, setVisible] = useState(false);

  const breadcrumb = [
    {
      title: "Course",
      path: "/course/list",
    },
    {
      title: props.data?.CourseName,
    },
  ];

  const { relatedCourse } = useSelector((state) => state.courseData);

  useEffect(() => {
    dispatch(getRelatedCourses(props.data?.Categoryid));
  }, []);

  const handleAddCart = async (e) => {
    if (!userId) {
      // message.error('Please login first');
      setLoginModal({
        ...loginModal,
        visible: true,
      })
      return;
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      if (cartData) {
        if (cartData.some((c) => c["CourseID"] === props.data.CourseID)) {
          message.warn("this course is already in the cart");
        } else {
          await localStorage.setItem(
            "cartData",
            JSON.stringify([...cartData, props.data])
          );
        }
      } else {
        await localStorage.setItem("cartData", JSON.stringify([props.data]));
      }
      dispatch(getCartList());
      // setVisible(true);
    }
  };

  const handleCheckout = async (e) => {
    if (!userId) {
      // message.error('Please login first');
      setLoginModal({
        ...loginModal,
        visible: true,
      })
      return;
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      if (cartData) {
        if (cartData.some((c) => c["CourseID"] === props.data.CourseID)) {
          message.warn("this course is already in the cart");
        } else {
          await localStorage.setItem(
            "cartData",
            JSON.stringify([...cartData, props.data])
          );
        }
        dispatch(getCartList());
        history.push({
          pathname: "/order/cart",
        })
      } else {
        await localStorage.setItem("cartData", JSON.stringify([props.data]));
        dispatch(getCartList());
        history.push({
          pathname: "/order/cart",
        })
      }

    }
  };

  const handleBookMark = (e) => {
    e.stopPropagation();
    const userId = localStorage.getItem('CPDUserID');
    if (!userId) {
      setLoginModal({
        ...loginModal,
        visible: true,
      })
    } else {
      const body = {
        UserId: userId,
        CourseId: props.data.CourseID,
      };
      if (bookmarkState === 0) {
        // dispatch(addBookMark(body));
        axios
          .post(secondBaseURL + "Course/AddBookMark", body, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': "Bearer " + localStorage.getItem("token")
            },
          })
          .then((res) => {
            setBookmarkState(1)
          })
          .catch((e) => console.log(e));
      } else {
        // OK to cancel bookmark
        confirm({
          title: 'OK to cancel bookmark?',
          // content: 'Some descriptions',
          onOk() {
            dispatch(removeBookMark(body));
            axios
              .post(secondBaseURL + "Course/RemoveBookMark", body, {
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': "Bearer " + localStorage.getItem("token")
                },
              })
              .then((res) => {
                console.log(res);
                setBookmarkState(0)
              })
              .catch((e) => console.log(e));
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    }
  };

  if (!relatedCourse) {
    return <RouterLoading />;
  }

  return (
    <div className="d-flex flex-column" style={{ margin: '0 auto' }}>
      <div className="d-flex justify-content-center bg-light-theme--course-unowned">
        <div className="content-container w-80">
          <PageHeader data={breadcrumb} theme="white" />
          <Row className="pl-2 pr-2 mt-0 pt-0">
            <Col md={15} lg={15} className="pr-5">
              <DetailHeader data={props.data} />

              {/* overview */}
              <div className="section-card section-card--animated border-radius-8 bg-white mt-4">
                <div className="color-dark-grey-3 fs-20 mx-5 mt-4 mb-3">
                  Overview
                </div>
                <div className="rectangle rectangle--light rectangle--small card-rectangle" />
                {/* <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30">
                  {props.data.CourseDescription}
                </div> */}
                <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30" dangerouslySetInnerHTML={{ __html: props.data.CourseDescription }} />
              </div>

              {/* what you will learn */}
              <div className="section-card section-card--animated border-radius-8 bg-white mt-4">
                <div className="color-dark-grey-3 fs-20 mx-5 mt-4 mb-3">
                  What you will learn from this course?
                </div>
                <div className="rectangle rectangle--light rectangle--small card-rectangle" />
                {/* <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30">
                  {props.data.LearnPoints}
                </div> */}
                <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30" dangerouslySetInnerHTML={{ __html: props.data.LearnPoints }} />
              </div>

              {/* how does it works //todo */}
              <div className="section-card section-card--animated border-radius-8 bg-white mt-4 mb-100">
                <div className="color-dark-grey-3 fs-20 mx-5 mt-4 mb-3">
                  How does it work?
                </div>
                {/* <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30">
                  {flowchart}
                </div> */}
                {/* <HowItWorks className="bg-white"/> */}
                <HowToWords Enrollment={'Choose courses of your interest or relevant to your work as a CPA.'} />
              </div>

              {/* reviews */}
              <div>
                <ReviewList data={props.data} />
              </div>
            </Col>

            <Col md={9} lg={9} className="mt-4">
              <div className="section-card border-radius-8 bg-white mt-4">
                <div className="text-center">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls={true}
                    url={props.data.PreviewUrl}
                  />
                </div>

                <div className="d-flex justify-content-between mx-5">
                  <div className="mt-3">
                    <span className="color-orange fs-28 mr-3 fw-800">
                      CA ${props.data.CoursePrice}
                    </span>

                    <span className="color-dark-grey-2 fs-20 line-cross">
                      {/* <del>(${props.data.OriginalCoursePrice})</del> */}
                      {props.data.OriginalCoursePrice && <del>${props.data.OriginalCoursePrice ? props.data.OriginalCoursePrice : 0.00}</del>}
                    </span>
                  </div>

                  <div className="bookmark-container d-flex justify-content-center">
                    <div
                      onClick={(e) => handleBookMark(e)}
                      className={
                        bookmarkState
                          ? "bookmark bookmark--gold"
                          : "bookmark bookmark--grey"
                      }
                    >
                      <img
                        src={bookmarkStar}
                        className={
                          bookmarkState
                            ? "bookmark-star bookmark-star--big"
                            : "bookmark-star bookmark-star--small"
                        }
                        alt="/"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between px-5 pb-5 pt-4">
                  <div
                    role="button"
                    className="mb-2 rounded-pill button button--white-hover-white button--animated"
                    onClick={(e) => handleAddCart(e)}
                  >
                    Add to Cart
                  </div>

                  <div
                    role="button"
                    className="mb-2 rounded-pill button button--light-hover-dark button--animated"
                    onClick={(e) => handleCheckout(e)}
                  >
                    Buy Now
                  </div>
                </div>

                {/* course features */}
                <div className="mt-5 p-5">
                  <span className="fs-22 color-dark-grey-2">
                    Course Features
                  </span>
                  <div
                    className="mt-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center fs-20">
                      <HistoryOutlined style={{ color: "#3DAFBE" }} />
                      <div className="fs-20 color-dark-grey-2 ml-3">Duration</div>
                    </div>
                    <div className="fs-20 color-light-grey-2">
                      {props.data.CourseDuration} Hours
                    </div>
                  </div>
                  <div
                    className="mt-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center fs-20">
                      <ProfileOutlined style={{ color: "#3DAFBE" }} />
                      <div className="fs-20 color-dark-grey-2 ml-3">Contents</div>
                    </div>
                    <div className="fs-20 color-light-grey-2">
                      {props.data.VideoContent.length} Sections
                    </div>
                  </div>
                  <div
                    className="mt-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center fs-20">
                      <ReadOutlined style={{ color: "#3DAFBE" }} />
                      <div className="fs-20 color-dark-grey-2 ml-3">Skill Level</div>
                    </div>
                    <div className="fs-20 color-light-grey-2">
                      {props.data.SkilllevelName}
                    </div>
                  </div>
                  <div
                    className="mt-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center fs-20">
                      <FileProtectOutlined style={{ color: "#3DAFBE" }} />
                      <div className="fs-20 color-dark-grey-2 ml-3">Certification</div>
                    </div>
                    <div className="fs-20 color-light-grey-2">
                      Yes
                    </div>
                  </div>
                  <div
                    className="mt-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center fs-20">
                      <ExportOutlined style={{ color: "#3DAFBE" }} />
                      <div className="fs-20 color-dark-grey-2 ml-3">Available Access</div>
                    </div>
                    <div className="fs-20 color-light-grey-2">
                      Video
                    </div>
                  </div>
                  <div
                    className="mt-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center fs-20">
                      <GlobalOutlined style={{ color: "#3DAFBE" }} />
                      <div className="fs-20 color-dark-grey-2 ml-3">Language</div>
                    </div>
                    <div className="fs-20 color-light-grey-2">
                      English
                    </div>
                  </div>
                </div>
              </div>

              {/* course content */}
              {props.data.VideoContent.length > 0 &&
                <div className="section-card border-radius-8 bg-white mt-4">
                  <div className="pt-4 px-4 pb-0 mb-0">
                    <span className="fs-20 color-dark-grey-2 ml-4 mt-5">{
                      console.log(props.data.NumberOfCourseInPackage)
                    }
                      {`Course Content - ${props.data.VideoContent.length} Sections`}
                    </span>

                    <Divider className="mx-0 mt-3 mb-0" />
                  </div>

                  <Collapse
                    ghost
                    bordered={false}
                    defaultActiveKey={["0"]}
                    expandIcon={({ isActive }) => {
                      return !isActive ? (
                        <div className="d-inline-flex fs-20 ">
                          <PlusOutlined className="fs-17" />
                        </div>
                      ) : (
                        <div className="d-inline-flex fs-20 ">
                          <MinusOutlined className="fs-17" />
                        </div>
                      );
                    }}
                    expandIconPosition="left"
                    className="course-detail py-2"
                  >
                    {/* <Panel
                    header={
                      <div className="d-flex align-items-center" style={{marginTop: '-25px', marginLeft: '20px'}}>
                        <span className="color-dark-grey-2 fs-20 mr-auto  ml-2">
                          Course Videos
                        </span>
                        <span className="color-dark-grey-2 fs-20">
                          {props.data.VideoContent.length} Files
                        </span>
                      </div>
                    }
                  > */}
                    {props.data.VideoContent.map((item, index) => {
                      return (
                        // <div className="bg-light-grey-1 py-2 pl-60 fs-16" onClick={()=>{
                        //   // setVideoUrl(item.ContentUrl);
                        //   // setVisibleVideo(true);
                        // }}>
                        //   {item.CourseContentTitle} 
                        //   <span className="pl-10 color-light-theme">{item.Duration} {' mins'}</span>
                        // </div>
                        <Panel
                          header={
                            <div className="d-inline-flex align-items-center">
                              <span className="color-dark-grey-2 fs-20 mr-auto  ml-2">
                                {"Module " + (index + 1)}
                              </span>
                              <span className="color-dark-grey-2 fs-20">
                                {/* {item.number} Files */}
                              </span>
                            </div>
                          }
                          key={index}
                        >
                          <div className="bg-light-grey-1 py-2">
                            <div
                              key={index}
                              className="d-flex justify-content-around align-items-center py-2"
                            >
                              {/* <span className="ml-55 mr-2 d-flex align-items-center fs-18 panel-container color-light-grey-2 py-1">
                                {item.icon}
                              </span> */}

                              <span className="mr-30 fs-16 panel-container color-light-grey-2 py-1">
                                {item.CourseContentTitle}
                              </span>

                              <div className="fs-14 color-light-theme float-right">
                                {item.Duration + " mins"}
                              </div>
                            </div>
                          </div>
                        </Panel>
                      )
                    })}
                    {/* </Panel> */}
                  </Collapse>
                </div>
              }
            </Col>
            {/* package course */}
            {
              props.data.ChildCourse &&
              <Col className="mb-100 w-100" md={24} lg={24}>
                <div className="fs-30 color-dark-grey-2 mt-40">
                  Package Content
                </div>
                <div className="rectangle rectangle--light rectangle--size-12 blog-rectangle mb-3" />
                <CourseCarousel data={props.data.ChildCourse} />
              </Col>
            }
            {/* Related Course */}
            <Col className="mb-100 w-100" md={24} lg={24}>
              <div className="fs-30 color-dark-grey-2 mt-40">
                Related Courses
              </div>

              <div className="rectangle rectangle--light rectangle--size-12 blog-rectangle mb-3" />

              <CourseCarousel data={relatedCourse} />
            </Col>
          </Row>
        </div>
      </div>

      <Modal
        title="Item has been added to your Cart"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddToCartModal courseData={props.data} />
      </Modal>
      {/* <Modal visible={visibleVideo} footer={null}>
        <ReactPlayer
          width="100%"
          height="100%"
          controls={true}
          url={videoUrl}
        />
      </Modal> */}
      <Modal
        visible={loginModal.visible}
        width="400px"
        footer={null}
        wrapClassName="border-radius-8"
        onCancel={() => setLoginModal({ ...loginModal, visible: false })}
      >
        <div className="w-60 m-auto login-modal-wrapper">
          <Row justify="center" align="middle" className="w-100 m-auto mb-3">
            <div
              role="button"
              className={`w-30 text-center mr-2 py-2 login-tab ${loginModal.login ? "login-tab-active" : ""
                }`}
              onClick={() => setLoginModal({ ...loginModal, login: true })}
            >
              Login
            </div>
            <div
              role="button"
              className={`w-40 text-center py-2 login-tab ${loginModal.login ? "" : "login-tab-active"
                }`}
              onClick={() => setLoginModal({ ...loginModal, login: false })}
            >
              Register
            </div>
          </Row>
        </div>
        {loginModal.login ? (
          <LoginForm setLoginModal={setLoginModal} loginModal={loginModal} />
        ) : (
          <RegistrationForm setLoginModal={setLoginModal} />
        )}
      </Modal>
    </div>
  );
};

export default Detail;
